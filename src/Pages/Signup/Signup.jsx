"use client";
import React, { useEffect, useState } from "react";
import bgImg from "/public/assets/img/signinBg.jpg";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import signupLottie from "/public/assets/lottieAnimation/signup-lottie.json";
import registrationLoadingLottie from "/public/assets/lottieAnimation/registration_loading";
import successRegistrationLottie from "/public/assets/lottieAnimation/successfully-registration-lottie.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../Provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import myLocalDB from "../../util/localDB";

const Signup = () => {
  const navigate = useNavigate()
  const { user, signUpByEmailPass, authLoading, setAuthLoading, profileUpdateFunc } = useAuth()

  // const { axiosSecure } = useAxiosSecure();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isConfirmShowPass, setIsConfirmShowPass] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {storeUsers} = myLocalDB

  // If user not exist, then redirect to homepage
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // signup func
  const handleSignupFunc = (form) => {
    setAuthLoading(true);
    const { name, photo, email, password, confirmPassword, terms, bio } =
      form;
    const formData = new FormData();
    formData.append("image", photo[0]);

    if (!terms) {
      setError("*Please check terms and condition!");
      setAuthLoading(false)
      return;
    }
    if (password !== confirmPassword) {
      setError("*Your password is not match!");
      setAuthLoading(false)
      return;
    }

    // password regexp
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      setAuthLoading(false)
      return;
    }

    // After hosting photo then post register info
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_API_KEY}`;
    axios
      .post(url, formData)
      .then((res) => {
        const photo_url = res.data.data.url;
        const user = {
          name,
          photo_url,
          email,
          bio,
          isTeam: []
        };
        signUpByEmailPass(email, password)
          .then((res) => {
            setSuccess("Registration successful");
            setAuthLoading(false);
            profileUpdateFunc(user?.name, user?.photo_url)
              .then((res) => {
                setAuthLoading(false);
                Swal.fire({
                  title: "Account created! Navigate to homepage!",
                  html: "I will land homepage after <b></b> milliseconds.",
                  timer: 1000,
                  timerProgressBar: true,
                })
                  .then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      storeUsers(user)
                      navigate('/')
                      // console.log("I was closed by the timer 112"a);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

              })
              .catch((err) => {
                setAuthLoading(false);
                console.log(err);
              });
          })
          .catch((error) => { setAuthLoading(false), console.log(error) });
      })
      .catch((error) => { setAuthLoading(false), console.log(error) });
  };

  return (
    <div
      className="bg-cover bg-center bg-slate-800 bg-blend-overlay pl-16 xl:pl-0"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="min-h-screen grid grid-col-1 md:grid-cols-2 gap-4 xl:gap-8 items-center my-container">
        <form
          onSubmit={handleSubmit(handleSignupFunc)}
          className="space-y-3 p-5 lg:p-10 bg-purple-500 bg-opacity-25 shadow rounded"
        >
          <h2 className="font-bold text-3xl text-white">Please Register</h2>

          {/* name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              className="my-inp"
              id="name"
              {...register("name", { required: true })}
              placeholder="Your name here"
            />
            {errors.name && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          {/* photo */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              Photo
            </label>
            <input
              type="file"
              className="file-input file-input-bordered focus:outline-0 file-input-error my-inp !p-0"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="my-inp"
              {...register("email", { required: true })}
              placeholder="Your email here"
            />
            {errors.email && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          {/* bio */}
          <div>
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              Bio
            </label>
            <textarea
              type="number"
              className="my-inp h-32"
              id="bio"
              {...register("bio", { required: true })}
              placeholder="Your bio here..."
            />
            {errors.bio && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

{/* password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              Password
            </label>
            <input
              type={`${isShowPass ? "text" : "password"}`}
              id="password"
              className="my-inp"
              {...register("password", { required: true })}
              placeholder="••••••••"
            />
            <span
              className="absolute right-2 top-11 text-white cursor-pointer"
              onClick={() => setIsShowPass(!isShowPass)}
            >
              {" "}
              {isShowPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}{" "}
            </span>
            {errors.password && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

{/* confirm password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type={`${isConfirmShowPass ? "text" : "password"}`}
              id="confirmPassword"
              className="my-inp"
              {...register("confirmPassword", { required: true })}
              placeholder="••••••••"
            />
            <span
              className="absolute right-2 top-11 text-white cursor-pointer"
              onClick={() => setIsConfirmShowPass(!isConfirmShowPass)}
            >
              {" "}
              {isConfirmShowPass ? (
                <FaEye></FaEye>
              ) : (
                <FaEyeSlash></FaEyeSlash>
              )}{" "}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  {...register("terms", { required: true })}
                  className="w-4 h-4"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-slate-300">
                  Accept{" "}
                  <Link to={"/terms"} className="link-hover link-primary">
                    Terms and Condition
                  </Link>
                </label>
              </div>
            </div>
          </div>
          {errors.terms && (
            <p className="text-red-500">
              You need to checked terms & condition!{" "}
            </p>
          )}
          {error && <p className="text-red-500">*{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            className={`my-btn-one w-full ${authLoading && "!bg-opacity-10"}`}
            type="submit"
            disabled={authLoading}
          >
            Signup
          </button>
          <p className="text-sm font-light text-slate-300">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </form>

        <Lottie
          animationData={
            success
              ? successRegistrationLottie
              : authLoading
                ? registrationLoadingLottie
                : signupLottie
          }
          loop={true}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Signup;
