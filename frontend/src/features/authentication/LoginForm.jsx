import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthServices.js";
import { UserContext } from "../../context/UserContext.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { toast } from "react-hot-toast";
import Popup from "../../components/Popup.jsx";
import ExistingUsersContext from "../../context/ExistingUsersContext.jsx";
import { useTranslation } from 'react-i18next'

const LoginForm = () => {
  const { t } = useTranslation()
  const [input, setInput] = useState({ username: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const { existingUsername,fetchExistingUsers } = useContext(ExistingUsersContext)

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (username,password) => {
    
    try {
      const userData = await login(username, password)
      if (userData) {
        setCurrentUser(userData)
        toast.success(t('Logged in successfully'))
        await fetchExistingUsers()
        navigate('/dashboard', { replace: true })
      } else {
        toast.error(t('Login failed'))
      }
    } catch (err) {
      if (!err.message || !err.message.includes('Login failed')) {
        if (err.response) {
          toast.error(`Login failed: ${err.response.data.error}`)
        } else {
          toast.error(t('An error occurred. Please try again later.'))
        }
      }
    }
  };

  const handleYesClick = () => {
    handleLogin(input.username, input.password)
  };
  const handleNoClick = () => {
    setIsVisible(false);
    navigate("/login", { replace: true });
  };


  const handleLoginClick = async () => {
    setSubmitted(true)
    const isUsernameValid = input.username.length >= 3
    const isPasswordValid = input.password.length >= 4

    if (!isUsernameValid || !isPasswordValid) {
      return
    }
    handleLogin(input.username, input.password)
  }


  return (
    <>
      <div className="flex flex-col justify-between w-full">
        {/* <Popup
          clickYes={handleYesClick}
          clickNo={handleNoClick}
          visibility={isVisible}
          username={input.username}
        /> */}
        <Input
          placeholder="Enter Username"
          label={t("Username")}
          name="username"
          error={
            submitted && (!input.username || input.username.length < 3)
              ? t("Username must be at least 3 characters")
              : ""
          }
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Password"
          label={t("Password")}
          name="password"
          error={
            submitted && (!input.password || input.password.length < 4)
              ? t("Please enter a valid password")
              : ""
          }
          type="password"
          onChange={handleChange}
        />
      </div>
      <div className="items-center w-full mt-12">
        <Button
          size="large"
          backgroundColor={`bg-colorBluePrimary`}
          textColor={`text-white`}
          onClick={handleLoginClick}
        >
          {t('Login')}
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
