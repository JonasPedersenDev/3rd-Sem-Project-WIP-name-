//This is just a react component to test the testing environment. Use it as a template for testing react components.

const Greet = ({ name }: { name?: string}) => {
    if (name) return <h1>Hello {name}</h1>;

    return <button>Login</button>;
};

export default Greet;
