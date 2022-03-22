import "./App.css";
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import Home from "./components/pages/Home/Home.view";
import Gallery from "./components/pages/Gallery/Gallery.view";
import Peminjaman from "./components/pages/Peminjaman/Peminjaman.view"
import Login from "./components/pages/Login/Login.pages";
import Daftar from "./components/pages/Daftar/Daftar.view";
import SyaratPeminjaman from "./components/pages/SyaratPeminjaman/SyaratPeminjaman.view";
import Profile from "./components/pages/Profile/Profile.view";
import ProfileSetting from "./components/pages/ProfileSetting/ProfileSetting.view";
import HomeLogin from "./components/pages/HomeLogin/HomeLogin.view";
import GalleryLogin from "./components/pages/GalleryLogin/GalleryLogin.view";
import AddGalery from "./components/pages/AddGallery/AddGallery"
import PangkalanLogin from "./components/pages/PangkalanLogin/PangkalanLogin.view";
import InsideProfile from "./components/pages/AddSetoran/AddSetoran";
import SyaratPangkalanLogin from "./components/pages/SyaratPeminjamanLogin/SyaratPeminjamanLogin";
import TentangKami from "./components/pages/TentangKami/TentangKami.view";
import TentangKamiLogin from "./components/pages/TentangKamiLogin/TentangKamiLogin.view";
import AddSetoranPokok from "./components/pages/AddSetoranPokok/AddSetoranPokok"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/beranda" element={<Home />} />
        <Route exact path="/pangkalan" element={<Peminjaman />} />
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/daftar' element={<Daftar/>}/>
        <Route exact path='/SyaratPangkalan' element={<SyaratPeminjaman/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/profile-setting' element={<ProfileSetting/>}/>
        <Route exact path='/beranda-login' element={<HomeLogin/>}/>
        <Route exact path='/gallery-login' element={<GalleryLogin/>}/>
        <Route exact path='/upload-gallery' element={<AddGalery/>}/>
        <Route exact path='/SyaratPangkalan-login' element={<SyaratPangkalanLogin/>}/>
        <Route exact path='/pangkalan-login' element={<PangkalanLogin/>}/>
        <Route exact path='/add-setoran' element={<InsideProfile/>}/>
        <Route exact path='/add-setoranpokok' element={<AddSetoranPokok/>}/>
        <Route exact path='/tentang-kami' element={<TentangKami/>}/>
        <Route exact path='/tentang-kami-login' element={<TentangKamiLogin/>}/>
      </Routes>
    </Router>
    
);
}

export default App;
