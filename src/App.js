import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
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
import { AuthProvider } from "contexts/auth.context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route caseSensitive path="/" element={<Home />} />
          <Route caseSensitive path="/gallery" element={<Gallery />} />
          <Route caseSensitive path="/pangkalan" element={<Peminjaman />} />
          
          <Route caseSensitive path='/beranda-login' element={<HomeLogin />} />
          <Route caseSensitive path='/gallery-login' element={<GalleryLogin />} />
          <Route caseSensitive path='/upload-gallery' element={<AddGalery />} />

          <Route caseSensitive path='/login' element={<Login />} />
          <Route caseSensitive path='/daftar' element={<Daftar />} />
          <Route caseSensitive path='/SyaratPangkalan' element={<SyaratPeminjaman />} />
          <Route caseSensitive path='/profile' element={<Profile />} />
          <Route caseSensitive path='/profile-setting' element={<ProfileSetting />} />
          
          <Route caseSensitive path='/SyaratPangkalan-login' element={<SyaratPangkalanLogin />} />
          <Route caseSensitive path='/pangkalan-login' element={<PangkalanLogin />} />
          <Route caseSensitive path='/add-setoran' element={<InsideProfile />} />
          <Route caseSensitive path='/add-setoranpokok' element={<AddSetoranPokok />} />
          <Route caseSensitive path='/tentang-kami' element={<TentangKami />} />
          <Route caseSensitive path='/tentang-kami-login' element={<TentangKamiLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
