import Coins from './Coins/Coins';
import CoinsDetails from './Coins/CoinsDetails';
import Header from './Common/Header/Header.jsx';
import Footer from './Common/Footer/Footer.jsx';
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Coins />}></Route>
          <Route path = "/coins/:id"  element= {<CoinsDetails/>}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
