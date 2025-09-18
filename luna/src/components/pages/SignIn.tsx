import Input from "../Input";
import Button from "../Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try{
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                })
            });

            const data = await response.json();

            if(response.ok){
                //store JWT in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log("Logged in:", data.user);
                navigate('/')
                //Redirect or update UI
            }else{
                setError(data.error||"Login failed");
            }


        }catch(err){
            setError("Server error please try again")
        }
    }
    return (
        <>
            <div>
            <section className="flex justify-center mb-[50px]">
                <h1>Login</h1>
            </section>

            <section className="flex flex-col text-left items-center gap-7">
                <form onSubmit={handleSubmit}>
                    <Input label="USERNAME" typeUse="text" name="username" value={formData.username} onChange={handleChange}/>
                    <Input label="PASSWORD"typeUse="password" name="password" value={formData.password} onChange={handleChange}/>
                    <Button text="Sign In" bg="dark" type="submit"/>
                </form>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </section>
            </div>
        </>
    );
}

export default SignIn;