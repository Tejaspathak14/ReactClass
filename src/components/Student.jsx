function Student({ name, age }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "10px",
        maxWidth: "300px",
      }}
    >
      <h3 style={{ margin: "0 0 6px" }}>{name}</h3>
      <p style={{ margin: 0 }}>Age: {age}</p>
    </div>
  );
}

export default Student;
