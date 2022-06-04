import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap';


function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <h3>techVision</h3>
        </Container>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;
