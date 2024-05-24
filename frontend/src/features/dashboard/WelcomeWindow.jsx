
function welcomeWindow({ toggleWelcome, visibilityWelcome }) {
  return (
    <>
      {visibilityWelcome && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-indigo-100 rounded-lg shadow-md p-6 flex flex-col w-full max-w-lg mx-auto justify-center self-center relative z-10">
            <p className="text-lg font-medium mb-4">Welcome to ESN</p>

            <p className="text-lg font-medium mb-4">
              Below the overview of the statuses and how you can share your
              status into the community:
            </p>

            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-500">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Meaning
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-500">
                      Color
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-500">Ok</td>
                    <td className="px-4 py-2 border border-gray-500">
                      I am OK, I do not need help.
                    </td>
                    <td className="px-4 py-2 border border-gray-500">Green</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-500">Help</td>
                    <td className="px-4 py-2 border border-gray-500">
                      I need help, but this is not a life threatening emergency.
                    </td>
                    <td className="px-4 py-2 border border-gray-500">Yellow</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-500">
                      Emergency
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      I need help now, as this is a life threatening emergency!
                    </td>
                    <td className="px-4 py-2 border border-gray-500">Red</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg font-medium mb-4">
              To share the status, Please click on share status
            </p>

            <p className="text-lg font-medium mb-4">
              Proceed to the user directory ?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleWelcome}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default welcomeWindow;
