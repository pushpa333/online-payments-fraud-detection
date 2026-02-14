import { useLocation, Link } from "react-router-dom";
import { ShieldAlert, ShieldCheck, ArrowLeft, RotateCcw } from "lucide-react";

const Result = () => {
  const location = useLocation();
  const { isFraud, amount } = (location.state as { isFraud: boolean; amount: number }) || {
    isFraud: false,
    amount: 0,
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-16">
      <div className="container mx-auto max-w-lg px-6 py-16 text-center">
        <div
          className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 ${
            isFraud
              ? "border-destructive/50 bg-destructive/10 glow-danger"
              : "border-success/50 bg-success/10 glow-success"
          }`}
        >
          {isFraud ? (
            <ShieldAlert className="h-12 w-12 text-destructive animate-pulse-glow" />
          ) : (
            <ShieldCheck className="h-12 w-12 text-success" />
          )}
        </div>

        <h1 className="mb-4 font-heading text-3xl font-bold tracking-wide text-foreground">
          Prediction Result
        </h1>

        <div
          className={`mb-6 inline-block rounded-full px-6 py-2 font-heading text-sm font-bold uppercase tracking-widest ${
            isFraud
              ? "bg-destructive/20 text-destructive glow-danger"
              : "bg-success/20 text-success glow-success"
          }`}
        >
          {isFraud ? "⚠ FRAUD DETECTED" : "✓ NOT FRAUD"}
        </div>

        <p className="mb-10 text-muted-foreground">
          The predicted result for the transaction of{" "}
          <span className="font-semibold text-foreground">
            ${amount.toLocaleString()}
          </span>{" "}
          is{" "}
          <span className={isFraud ? "text-destructive font-bold" : "text-success font-bold"}>
            {isFraud ? "Fraudulent" : "Legitimate"}
          </span>
          .
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 glow-primary"
          >
            <RotateCcw className="h-4 w-4" />
            New Prediction
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-heading text-xs font-semibold uppercase tracking-widest text-secondary-foreground transition-all hover:border-primary/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
