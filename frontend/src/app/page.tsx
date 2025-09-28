"use client";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  price: number;
  priceWithTax: number;
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const TAX_RATE = 0.12;

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then(setServices);
  }, []);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedItems = services.filter((s) => selectedServices.includes(s.id));
  const baseTotal = selectedItems.reduce((sum, s) => sum + s.price, 0);
  const taxTotal = baseTotal * TAX_RATE;
  const grandTotal = baseTotal + taxTotal;

  const bookAppointment = async () => {
    if (!name || !phone || selectedServices.length === 0) {
      alert("Please complete all fields and select at least one service.");
      return;
    }

    const clientRes = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    const client = await clientRes.json();

    const appointmentRes = await fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: client.id,
        serviceIds: selectedServices,
        date: new Date().toISOString(),
      }),
    });

    const appointment = await appointmentRes.json();
    alert("Appointment booked!\n" + JSON.stringify(appointment, null, 2));

    setSelectedServices([]);
    setName("");
    setPhone("");
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Dental Clinic Appointment</h1>
          <p style={styles.subtitle}>Book your dental services with ease</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Available Services</h2>
          <div style={styles.servicesGrid}>
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  ...styles.serviceCard,
                  ...(selectedServices.includes(service.id) ? styles.serviceCardSelected : {})
                }}
                onClick={() => toggleService(service.id)}
              >
                <div style={styles.serviceHeader}>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.serviceName}>{service.name}</span>
                </div>
                <div style={styles.servicePrice}>
                  <div style={styles.priceMain}>₱{service.price}</div>
                  <div style={styles.taxText}>₱{service.priceWithTax} incl. tax</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Your Information</h2>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Invoice Summary</h2>
          <div style={styles.invoice}>
            <div style={styles.invoiceRow}>
              <span style={styles.invoiceLabel}>Base Total:</span>
              <span style={styles.invoiceValue}>₱{baseTotal.toFixed(2)}</span>
            </div>
            <div style={styles.invoiceRow}>
              <span style={styles.invoiceLabel}>Tax (12%):</span>
              <span style={styles.invoiceValue}>₱{taxTotal.toFixed(2)}</span>
            </div>
            <div style={{...styles.invoiceRow, ...styles.grandTotal}}>
              <span style={styles.invoiceLabel}><strong>Grand Total:</strong></span>
              <span style={styles.invoiceValue}><strong>₱{grandTotal.toFixed(2)}</strong></span>
            </div>
          </div>
        </section>

        <button 
          onClick={bookAppointment} 
          style={{
            ...styles.bookButton,
            ...((!name || !phone || selectedServices.length === 0) ? styles.bookButtonDisabled : {})
          }}
          disabled={!name || !phone || selectedServices.length === 0}
        >
          Book Appointment
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "2rem"
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "2rem",
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "1rem"
  },
  title: {
    color: "#1f2937",
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0"
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1rem",
    margin: "0"
  },
  section: {
    marginBottom: "2rem"
  },
  sectionTitle: {
    color: "#374151",
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem"
  },
  servicesGrid: {
    display: "grid",
    gap: "0.75rem"
  },
  serviceCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "white"
  },
  serviceCardSelected: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff"
  },
  serviceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
  },
  checkbox: {
    width: "1.25rem",
    height: "1.25rem",
    cursor: "pointer"
  },
  serviceName: {
    fontWeight: "500",
    color: "#1f2937"
  },
  servicePrice: {
    textAlign: "right" as const
  },
  priceMain: {
    color: "#1f2937", // Darker color for main price
    fontWeight: "600"
  },
  taxText: {
    fontSize: "0.875rem",
    color: "#4b5563" // Darker gray for tax text
  },
  formGroup: {
    display: "grid",
    gap: "1rem"
  },
  input: {
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.2s ease",
    outline: "none",
    color: "#1f2937", // Darker color for input text
    backgroundColor: "white"
  },
  invoice: {
    backgroundColor: "#f8fafc",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0"
  },
  invoiceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: "1px solid #e2e8f0"
  },
  invoiceLabel: {
    color: "#374151" // Darker color for invoice labels
  },
  invoiceValue: {
    color: "#1f2937", // Darker color for invoice values
    fontWeight: "500"
  },
  grandTotal: {
    borderBottom: "none",
    fontSize: "1.125rem",
    paddingTop: "1rem"
  },
  bookButton: {
    width: "100%",
    padding: "1rem 2rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.125rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: "1rem"
  },
  bookButtonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed"
  }
};