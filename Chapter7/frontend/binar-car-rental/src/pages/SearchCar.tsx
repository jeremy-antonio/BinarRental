import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { mobil } from "../assets";
import { useNavigate } from "react-router-dom";

export default function SearchCar() {
  const navigate = useNavigate();

  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" max-w-full flex pt-8 bg-[#F1F3FF] px-40">
        <div className="basis-1/2 flex flex-col">
          <div className="font-bold text-4xl leading-normal">Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</div>
          <div className="my-5">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</div>
          <button
            className="px-1 py-2 bg-[#5CB85F] rounded-sm font-bold text-white w-[28%]"
            onClick={async (e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Kembali
          </button>
        </div>
        <div className="basis-1/2 flex justify-end">
          <img src={mobil} alt="" className="" />
        </div>
      </div>
      {/* Search Bar */}
      <SearchBar></SearchBar>
      <Footer></Footer>
    </div>
  );
}
