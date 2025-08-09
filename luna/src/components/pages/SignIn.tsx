import Input from "../Input";
import Button from "../Button"
const SignIn = () => {
    return (
        <>
            <div>
            <section className="flex justify-center mb-[50px]">
                <h1>Login</h1>
            </section>

            <section className="flex flex-col text-left items-center gap-7">
                <Input label="USERNAME OR EMAIL ADDRESS"/>
                <Input label="PASSWORD"/>
                <Button text="Sign In" bg="black"/>
            </section>
            </div>
        </>
    );
}

export default SignIn;