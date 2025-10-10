import Input from "../Input";
import Button from "../Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";


const SignUp = () => {
    const {login} = useUser();
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]:value}))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(formData.password !== formData.confirmPassword){
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: formData.name,
                    username: formData.username,
                    password: formData.password,
                })
            });

            const data = await response.json();

            if (response.ok){
                setSuccess("Account created! You can now log in. ");
                setFormData({name:"", username: "", password: "", confirmPassword: ""})
                
                login(data.user, data.token);
                console.log("Logged in:", data.user);
                navigate(`/`);
            }else{
                setError(data.error || "Signup failed")
            }
        }catch(err){
            setError("Server error. Please try again later.")
        }
    }
    return (
        <>
            <div>
            <section className="flex justify-center mb-[50px]">
                <h1>Create an account</h1>
            </section>

            <section className="flex flex-col text-left items-center gap-7">
                <form className="flex flex-col text-left items-center gap-7" onSubmit={handleSubmit}>
                    {error &&
                        <div className="bg-[var(--dark)] text-[var(--red)] rounded-xl p-[10px] w-auto">
                            <p>{error}</p>
                        </div>}
                    <Input label="FULL NAME" typeUse="text" name="name" value={formData.name} onChange={handleChange}/>
                    <Input label="USERNAME" typeUse="text" name="username" value={formData.username} onChange={handleChange}/>
                    <Input label="PASSWORD" typeUse="password" name="password" value={formData.password} onChange={handleChange}/>
                    <Input label="RE-TYPE PASSWORD" typeUse="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                    <Button text="Register" bg="dark" type="submit" size="auto"/>


                </form>
                
            </section>
            </div>
        </>
    );
}

export default SignUp;