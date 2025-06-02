import Knapsack from "./Knapsack"
import minionImg from './assets/image/minion.png'


export default function App(){
  return(
    <div className="flex justify-center">
      <div className="max-w-xl pb-24">
        <h1 className="my-5 text-5xl font-TheMinion text-center ">Minion's Knapsack</h1>
        <p className="my-5 mx-auto font-mono text-justify">
          Minion sedang menjalankan misi dari Gru untuk mencuri barang berharga di museum. Karena tas mereka terbatas, Minion memakai kalkulator Knapsack ini untuk memilih barang paling bernilai tanpa melebihi kapasitas.
        </p>
        <Knapsack />
      </div>
      <footer className="h-12 fixed bottom-0 w-full bg-kuning"></footer>
      <img src={minionImg} alt="" className="w-64 h-auto fixed bottom-0 right-0" />
    </div>
  )
}
