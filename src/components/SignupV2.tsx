import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface SignupProps {}
// interface Inputs {
//   email: string;
//   password: string;
//   cfpassword: string;
// }
const schema = yup
  .object({
    email: yup.string().required().email("Invalid email format"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(/^\S*$/, "No whitespaces allowed")
      .max(15, "Password must be at most 15 characters"),
    cfpassword: yup
      .string()
      .when("password", (password, field) =>
        password
          ? field
              .required()
              .oneOf([yup.ref("password")], "Comfirm password is not matched")
          : field
      ),
  })
  .required();
const AuthFormV2: React.FC<SignupProps> = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const password = watch("password");
  // const password = watch("password");
  // const onSubmit: SubmitHandler<Inputs> = (data, e) => {
  //   console.log(data);
  //   e?.target.reset();
  // };
  const onSubmit = (data) => {
    console.log(data);
    reset();  
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
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <input
          className="border p-3 rounded "
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <span className="text-red-500">{errors.password?.message}</span>
        <label htmlFor="cfpassword">Comfirm password</label>
        <input
          className="border p-3 rounded"
          type="password"
          placeholder="Comfirm Password"
          {...register("cfpassword")}
        />
        <span className="text-red-500">{errors.cfpassword?.message}</span>
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

export default AuthFormV2;
