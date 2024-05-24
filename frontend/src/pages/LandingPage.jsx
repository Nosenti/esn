import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();  
  return (
    <section
      className="h-screen w-screen bg-white flex flex-col sm:flex-row min-h-0 min-w-0 overflow-hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <nav className="bg-white fixed w-full z-20 top-0 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://res.cloudinary.com/dcpjf6uns/image/upload/v1707620915/Logo_llf7pi.png"
            className="flex items-center space-x-3"
          >
            <img
              src="https://res.cloudinary.com/dcpjf6uns/image/upload/v1707620915/Logo_llf7pi.png"
              className="h-10"
              alt="ESN Logo"
            />
          </a>
          <div className="flex md:order-2 space-x-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-white bg-colorBluePrimary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>
      <section className="bg-white h-screen w-screen flex items-center justify-center overflow-auto md:px-4">
        <div className="max-w-screen-xl flex flex-col md:flex-row flex-wrap items-center justify-center md:px-4 mx-auto pt-24">
          <div className="w-full md:w-1/2 h-full flex items-center justify-center">
            <div className="flex flex-col justify-between lg:items-start md:px-8 px-8 lg:px-0">
              <div className="flex flex-col justify-between">
                <h1 className="font-bold text-gray-700 text-wrap text-6xl">
                  Stay Alert With The Emergency Social Network
                </h1>
                <p className="text-gray-400 mt-4 text-2xl">
                  Dedicated to keep you informed in case of emergencies with
                  respect to incidences in the neighbor hood.
                </p>
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-white bg-colorBluePrimary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Join the Community
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/2 h-full items-start">
            <img
              alt="Hero"
              className="w-full h-auto object-contain"
              src="https://res.cloudinary.com/dcpjf6uns/image/upload/v1707658444/Group_3_vj9njk.png"
            />
          </div>
        </div>
      </section>
    </section>
  );
};
export default LandingPage;
