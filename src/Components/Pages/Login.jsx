import React from 'react'

function Login() {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>


                    <form>
                        <div>

                            {/* username */}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>


                            {/* password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                Forget Password? <a className='underline' href="#">Click here</a>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                >
                                    Log In
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Login