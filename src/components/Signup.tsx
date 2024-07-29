import { ChangeEvent, useState } from "react";
import { validateForm } from "../utils";
interface SignupProps {}
const initSignupForm = {
  email: "",
  password: "",
  cfpassword: "",
};
const AuthForm: React.FC<SignupProps> = ({}) => {
  const [user, setUser] = useState(initSignupForm);
  const [errors, setError] = useState<Record<string, string>>({});
  const [isloading, setIsloading] = useState<boolean>(false);
  const handleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => {
      return { ...pre, [name]: value };
    });
    setError((pre) => {
      return { ...pre, [name]: " " };
    });
    // console.log(user);
  };
  const handleSubmit = (d: ChangeEvent<HTMLFormElement>) => {
    if (isloading) return;
    d.preventDefault();
    // console.log(user);
    const errors = validateForm(user);
    setError(errors);
    const noErrors = Object.values(errors).every((error) => error === " ");
    if (noErrors) {
      console.log("Form submit successfully: ", user);
      setUser(initSignupForm);
    }
    setIsloading(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        action=""
        className="flex flex-col max-w-[600px] w-full gap-3 mx-auto bg-slate-200 p-8 font-sans font-semibold text-lg rounded"
      >
        <h1 className="text-center font-bold text-3xl text-blue-500">
          Sign up
        </h1>
        <label htmlFor="Email">Email Address</label>
        <input
          className="border p-3 rounded "
          type="email"
          name="email"
          value={user.email}
          onChange={handleChanged}
          placeholder="Email Address"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          className="border p-3 rounded "
          type="password"
          name="password"
          value={user.password}
          onChange={handleChanged}
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <label htmlFor="cfpassword">Comfirm password</label>
        <input
          className="border p-3 rounded"
          type="password"
          name="cfpassword"
          value={user.cfpassword}
          onChange={handleChanged}
          placeholder="Comfirm Password"
        />
        {errors.cfpassword && (
          <p className="text-red-500">{errors.cfpassword}</p>
        )}
        <div className="text-right">
          <button
            className="font-semibold text-lg bg-blue-500 px-8 py-4 rounded text-white"
            type="submit"
            disabled={isloading}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
