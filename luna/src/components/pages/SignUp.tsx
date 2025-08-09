import Input from "../Input";
import Button from "../Button"
const SignUp = () => {
    return (
        <>
            <div>
            <section className="flex justify-center mb-[50px]">
                <h1>Create an account</h1>
            </section>

            <section className="flex flex-col text-left items-center gap-7">
                <Input label="EMAIL ADDRESS"/>
                <Input label="PASSWORD"/>
                <Input label="RE-TYPE PASSWORD"/>
                <Input label="USERNAME"/>
                <Button text="Register" bg="black"/>
            </section>
            </div>
        </>
    );
}

export default SignUp;