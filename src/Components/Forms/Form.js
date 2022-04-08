import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase.init";

const auth = getAuth(app);

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  const handleNameBlur = e => setName(e.target.value)

  const handleRegisteredChange = e => {
      setRegistered(e.target.checked);
  }

  const resetPassword = () =>{
      sendPasswordResetEmail(auth,email)
      .then(() => {
          console.log("mail sent");
      })
      .catch( error => {
          setError(error.message);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password must contain at least one special character");
      return;
    } else {
      setError("");
    }

    if (registered) {
        signInWithEmailAndPassword(auth,email,password)
        .then(result => {
            setUser(result.user);
        })
        .catch(error => {
            setError(error.message);
        })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            verifyEmail();
            updateUserInfo();
          console.log(result.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const updateUserInfo = () =>{
        updateProfile(auth.currentUser, {displayName : name, photoURL : 'https://avatars.githubusercontent.com/u/91162277?s=400&u=0e21a89e091544e754d419676fd729ba10d36ead&v=4'})
    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() => console.log('Verification Email Sent'))
        .catch(error => setError(error.message))
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {
            !registered && <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Name
            </label>
            <input
              onBlur={handleNameBlur}
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter you name"
              required
            />
          </div>
        }
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            onBlur={handleEmailBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="enter you email adress"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            onBlur={handlePasswordBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div className="text-red-700">
            <p className={error ? "block" : "hidden"}>{error}</p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              onChange={handleRegisteredChange}
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-900 dark:text-gray-300">
              Already Registered?
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 block mx-auto dark:focus:ring-blue-800"
        >
          {registered? 'Log In' : 'Register'}
        </button>
        <button
          onClick={resetPassword}
          type="submit"
          className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 block mx-auto dark:focus:ring-blue-800 mt-3"
        >
          Forgot Password?
        </button>
      </form>
      <div className="text-center">
          <p>{user.displayName}</p>
          <img src={user.photoURL} alt="" style={{display : 'block', margin: 'auto', borderRadius: '50%'}} />
      </div>
    </div>
  );
};

export default Form;
