import { useState } from "react";

function AddDonation() {
  const [form, setForm] = useState({
    type: "",
    quantity: "",
    description: ""
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Donation</h1>

      <form>
        <input
          name="type"
          placeholder="Food Type"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        <br /><br />

        <input
          name="quantity"
          placeholder="Quantity"
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddDonation;