import { useForm, SubmitHandler } from "react-hook-form";

interface SignupProps {}
interface Inputs {
  email: string;
  password: string;
  cfpassword: string;
}
const AuthFormV1: React.FC<SignupProps> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch("password");
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    console.log(data);
    e?.target.reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is no valid.",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          className="border p-3 rounded "
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be at-least 6 characters",
            },
            maxLength: {
              value: 12,
              message: "Password is too long",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label htmlFor="cfpassword">Comfirm password</label>
        <input
          className="border p-3 rounded"
          type="password"
          placeholder="Comfirm Password"
          {...register("cfpassword", {
            required: "Comfirm password is required",
            validate: (value) => value === password || "Comfirm is not match",
          })}
        />
        {errors.cfpassword && (
          <span className="text-red-500">{errors.cfpassword.message}</span>
        )}
        <div className="text-right">
          <button
            className="font-semibold text-lg bg-blue-500 px-8 py-4 rounded text-white"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthFormV1;
