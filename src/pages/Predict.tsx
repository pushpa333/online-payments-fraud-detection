import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Send } from "lucide-react";

const formSchema = z.object({
  step: z.number().min(0).max(1000),
  type: z.number().min(0).max(10),
  amount: z.number().min(0),
  oldbalanceOrg: z.number().min(0),
  newbalanceOrig: z.number().min(0),
  oldbalanceDest: z.number().min(0),
  newbalanceDest: z.number().min(0),
});

const fields = [
  { name: "step", label: "Step", placeholder: "e.g. 1" },
  { name: "type", label: "Type", placeholder: "e.g. 4 (PAYMENT=1, TRANSFER=4, CASH_OUT=2)" },
  { name: "amount", label: "Amount", placeholder: "e.g. 9839.64" },
  { name: "oldbalanceOrg", label: "Old Balance (Origin)", placeholder: "e.g. 170136.0" },
  { name: "newbalanceOrig", label: "New Balance (Origin)", placeholder: "e.g. 160296.36" },
  { name: "oldbalanceDest", label: "Old Balance (Destination)", placeholder: "e.g. 0.0" },
  { name: "newbalanceDest", label: "New Balance (Destination)", placeholder: "e.g. 0.0" },
] as const;

const Predict = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed: Record<string, number> = {};
    const newErrors: Record<string, string> = {};

    for (const f of fields) {
      const val = values[f.name];
      if (!val || val.trim() === "") {
        newErrors[f.name] = "Required";
      } else if (isNaN(Number(val))) {
        newErrors[f.name] = "Must be a number";
      } else {
        parsed[f.name] = Number(val);
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = formSchema.safeParse(parsed);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Mock prediction: flag as fraud if amount > 200000 or suspicious balance patterns
    const d = result.data;
    const isFraud =
      d.amount > 200000 ||
      (d.oldbalanceOrg > 0 && d.newbalanceOrig === 0 && d.amount > 10000) ||
      (d.oldbalanceDest === 0 && d.newbalanceDest === 0 && d.amount > 50000);

    navigate("/result", { state: { isFraud, amount: d.amount } });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-2 text-center font-heading text-3xl font-bold tracking-wide text-foreground text-glow">
          Fraud Prediction
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Enter transaction details to check for fraud
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {f.label}
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder={f.placeholder}
                value={values[f.name] || ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors[f.name] && (
                <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-4 font-heading text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-[1.02] glow-primary hover:brightness-110"
          >
            <Send className="h-4 w-4" />
            Submit Prediction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Predict;
