import { createContext, useState, useEffect } from "react";

export const KnapsackContext = createContext();

export default function Knapsack() {
  const [beratTas, setberatTas] = useState(0);
  const [banyakItem, setbanyakItem] = useState(0);
  const [items, setItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [knapsackTable, setKnapsackTable] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = knapsack(items, beratTas);
    setKnapsackTable(result.dp);        
    setMaxValue(result.maxValue);       
    setSelectedItems(result.selectedItems);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const updated = Array.from({ length: banyakItem }, (_, i) => items[i] || { weight: 0, value: 0 });
    setItems(updated);
  }, [banyakItem]);

  // Handler untuk update berat atau value
  const handleItemChange = (index, field, newValue) => {
    const updatedItems = [...items];
    updatedItems[index][field] = newValue;
    setItems(updatedItems);
  };


  return (
    <div>
        <KnapsackContext.Provider
        value={{
            beratTas, setberatTas,
            banyakItem, setbanyakItem,
            items, setItems
        }}
        >
        <form onSubmit={handleSubmit}>
            <Form
            labelName="Kapasitas Tas"
            id="KapasitasTas"
            onChange={(e) => setberatTas(Number(e.target.value))}
            />

            <Form
            labelName="Banyak Item"
            id="BanyakItem"
            onChange={(e) => {
                setIsSubmitted(false); 
                setbanyakItem(Number(e.target.value));
            }}
            />
            <div>
              <label htmlFor="" className="font-TheMinion text-biru ">DETAIL ITEM</label>
              <div className=" p-3 marker:mt-4 space-y-2 max-h-64 overflow-y-auto bg-biruMuda rounded">
                {items.map((item, index) => (
                  <MiniForm
                    key={index}
                    index={index}
                    item={item}
                    onChange={handleItemChange}
                  />
                ))}
              </div>
            </div>


            <div className="mt-4">
              <Button>Submit</Button>
            </div>
        </form>

        {isSubmitted && (
          <>
            <p className="font-TheMinion text-biru mt-5">TABEL KNAPSACK</p>
            <Tabel
              banyakItem={banyakItem}
              beratTas={beratTas}
              knapsackTable={knapsackTable}
            />

            <div className="mt-6 p-4">
              <p className="font-TheMinion text-biru">Value Maksimal: 
                <span className="text-hitam">{maxValue}</span>
              </p>
              <p className="font-TheMinion text-biru mt-2">
              Item Dicuri:{" "}
                <span className="text-hitam">
                  {selectedItems.map(i => `Item ${i + 1}`).join(", ")}
                </span>
              </p>
            </div>
          </>
        )}

        </KnapsackContext.Provider>
    </div>
  );
}



//Fungsi algoritma knapsack
function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  // Mengisi tabel dp
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Traceback: Menemukan item yang dipilih
  const selectedItems = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1); // Simpan indeks item
      w -= items[i - 1].weight;
    }
  }

  return {
    dp,
    maxValue: dp[n][capacity],
    selectedItems: selectedItems.reverse(), 
  };
}

function labelOutput(){
  return(
    <div>
      <div>
        <label htmlFor="">Value maksimal : </label>
      </div>
      <div>
        <label htmlFor="">Item dicuri : </label>
      </div>
    </div>
  );
}

// Komponen Form
function Form(props) {
  const { labelName = '', id = '', placeholder = '', onChange = () => {} } = props;
  return (
    <div className="text-base mb-5 font-TheMinion">
      <label htmlFor={id} className="block mb-1 text-biru">{labelName}</label>
      <input
        type="number"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        className=" border p-2 rounded w-full bg-abu"
      />
    </div>
  );
}

// Komponen MiniForm untuk mengisi detail value dan weight setiap item
function MiniForm({ index, item, onChange }) {
  return (
    <div className="flex gap-4 justify-center items-center font-TheMinion">
      <label className="w-24">Item {index + 1}</label>
      
      <input
        type="number"
        placeholder=""
        value={item.weight === 0 ? '' : item.weight}
        onChange={(e) => onChange(index, 'weight', Number(e.target.value))}
        className="border p-2 rounded w-24"
      />
      <input
        type="number"
        placeholder=""
        value={item.value === 0 ? '' : item.value}
        onChange={(e) => onChange(index, 'value', Number(e.target.value))}
        className="border p-2 rounded w-24"
      />
    </div>
  );
}


//Komponen Tabel
function Tabel({ banyakItem = 0, beratTas = 0, knapsackTable = [] }) {
  const kolom = Array.from({ length: beratTas + 1 }, (_, i) => i);
  const baris = Array.from({ length: banyakItem }, (_, i) => i);

  return (
    <table className="table-auto rounded border border-kuning text-center mt-4 w-full">
      <thead>
        <tr>
          <th className="border border-kuning px-2 py-1">Item \ Capacity</th>
          {kolom.map((k) => (
            <th key={k} className="border border-kuning px-2 py-1">{k}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {baris.map((b) => (
          <tr key={b}>
            <td className="border border-kuning px-2 py-1">Item {b + 1}</td>
            {kolom.map((k) => (
              <td key={k} className="border border-kuning px-2 py-1">
                {knapsackTable?.[b + 1]?.[k] ?? "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Komponen Button
function Button(props) {
  const { children } = props;
  return (
    <button type='submit' className='font-TheMinion border bg-biru text-white rounded p-2 w-full mb-4'>
      {children}
    </button>
  );
}





