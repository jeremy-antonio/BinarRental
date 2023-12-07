export default function SearchBar() {
  return (
    <div className="max-w-screen-xl p-4 mx-auto md:px-8 lg:px-10">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
              <div className="sm:col-span-1 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Tipe Driver
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  Tanggal
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="tanggal"
                    id="tanggal"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  Waktu Jemput / Ambil
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="waktu-jemput"
                    id="waktu-jemput"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  Waktu Jemput / Ambil
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cari Mobil
          </button>
        </div>
      </form>
    </div>
  );
}
