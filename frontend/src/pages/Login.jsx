
import { useTranslation } from 'react-i18next';
import LoginForm from '../features/authentication/LoginForm.jsx';

const Login = () => {
  const {t} = useTranslation()
  return (
    <section className="w-screen h-screen flex overflow-auto">
      <div className="w-screen h-full flex flex-row justify-between items-center">
        <div className="hidden md:block w-1/2 h-full bg-colorBluePrimary">
          <div className="w-full h-2/3 flex items-center justify-center bg-white rounded-b-full">
            <img
              src="https://res.cloudinary.com/dcpjf6uns/image/upload/v1707856246/Online_world-pana_1_dmz4fx.png"
              alt="login"
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2 h-screen justify-center px-8 ">
          <div>
            <a
              href="/login"
              className="flex items-center space-x-3"
            >
              <img
                src="https://res.cloudinary.com/dcpjf6uns/image/upload/v1707620915/Logo_llf7pi.png"
                className="h-10"
                alt="ESN Logo"
              />
            </a>
          </div>
          <div className="mt-9 mb-8">
            <h1 className="font-sans font-semibold text-2xl text-gray-700">
              {t('Welcome Back')}
            </h1>
            <p className="font-sans text-gray-500 text-lg">
             {t('Enter your details to continue')} 
            </p>
          </div>
          <LoginForm t={t } />
        </div>
      </div>
    </section>
  );
};

export default Login;
