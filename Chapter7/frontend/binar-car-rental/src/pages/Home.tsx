import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobil } from "../assets";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F1F3FF]">
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex mt-8">
        <div className="basis-1/2 flex flex-col">
          <div className="font-bold text-4xl leading-normal">Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</div>
          <div className="my-5">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</div>
          <button
            className="px-1 py-2 bg-[#5CB85F] rounded-sm font-bold text-white w-[28%]"
            onClick={async (e) => {
              e.preventDefault();
              navigate("/search");
            }}
          >
            Mulai Sewa Mobil
          </button>
        </div>
        <div className="basis-1/2 flex justify-end">
          <img src={mobil} alt="" className="" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
