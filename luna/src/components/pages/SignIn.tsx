import Input from "../Input";
import Button from "../Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";

const SignIn = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext){
    throw new Error("Signin component must be used within a UserProvider");
  }
  const { login } = userContext; // ✅ use context here

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);

        console.log("Logged in:", data.user);
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error please try again");
    }
  };

  return (
    <div>
      <section className="flex justify-center mb-[50px]">
        <h1>Login</h1>
      </section>

      <section className="flex flex-col text-left items-center gap-7">
        <form onSubmit={handleSubmit}>
          <Input
            label="USERNAME"
            typeUse="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="PASSWORD"
            typeUse="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button text="Sign In" bg="dark" type="submit" />
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>
    </div>
  );
};

export default SignIn;
