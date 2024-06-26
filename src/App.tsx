import "./App.css";
import PetContainer from "./containers/petContainer.tsx";
import catimg from "./assets/cat.png";
import dogimg from "./assets/dog.png";

function App() {
    return (
        <>
            <img
                src={catimg}
                style={{
                    position: "fixed",
                    right: 0,
                    bottom: -60
                }}
            />
            <img
                src={dogimg}
                style={{
                    transform: "scale(2)",
                    position: "fixed",
                    left: 0,
                    bottom: 100
                }}
            />
            <PetContainer />
        </>
    );
}

export default App;
