import React, { useMemo } from "react";
import styles from "./AlterarSenhaCard.module.css";
import cardStyles from "./Cards.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSave } from "react-icons/fa";

const AlterarSenhaCard = ({
  senha,
  setSenha,
  novaSenha,
  setNovaSenha,
  confirmarSenha,
  setConfirmarSenha,
  showSenha,
  setShowSenha,
  showNovaSenha,
  setShowNovaSenha,
  showConfirmarSenha,
  setShowConfirmarSenha,
  handleSavePassword,
}) => {
  // Regras para senha forte
  const rules = useMemo(
    () => ({
      minLength: 12,
      hasLower: /[a-z]/.test(novaSenha || ""),
      hasUpper: /[A-Z]/.test(novaSenha || ""),
      hasNumber: /[0-9]/.test(novaSenha || ""),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha || ""),
    }),
    [novaSenha]
  );

  const satisfied = useMemo(() => {
    return {
      length: (novaSenha || "").length >= rules.minLength,
      lower: rules.hasLower,
      upper: rules.hasUpper,
      number: rules.hasNumber,
      special: rules.hasSpecial,
    };
  }, [novaSenha, rules]);

  // calcula força: 0-5
  const score = useMemo(() => {
    let s = 0;
    if (satisfied.length) s += 2;
    if (satisfied.lower) s += 1;
    if (satisfied.upper) s += 1;
    if (satisfied.number) s += 1;
    if (satisfied.special) s += 1;
    return Math.min(s, 5);
  }, [satisfied]);

  const strength = useMemo(() => {
    if (score >= 5) return "forte";
    if (score >= 3) return "média";
    if (score > 0) return "fraca";
    return "";
  }, [score]);

  const strengthColor = useMemo(() => {
    if (strength === "forte") return "#16a34a";
    if (strength === "média") return "#f59e0b";
    if (strength === "fraca") return "#ef4444";
    return "#e5e7eb";
  }, [strength]);

  const passwordsMatch = useMemo(() => {
    return novaSenha && confirmarSenha && novaSenha === confirmarSenha;
  }, [novaSenha, confirmarSenha]);

  return (
    <div className={styles.alterarSenhaCard}>
      <div className={styles.inputGroup}>
        <label>Senha Atual:</label>
        <div className={styles.inputWrapper}>
          <input
            type={showSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Insira sua senha atual"
            autoComplete="current-password"
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowSenha(!showSenha)}
            aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {showSenha ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Nova Senha:</label>
        <div className={styles.inputWrapper}>
          <input
            type={showNovaSenha ? "text" : "password"}
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Insira sua nova senha"
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowNovaSenha(!showNovaSenha)}
            aria-label={showNovaSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {showNovaSenha ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Confirmar Senha:</label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirmarSenha ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme sua nova senha"
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
            aria-label={
              showConfirmarSenha ? "Ocultar senha" : "Mostrar senha"
            }
          >
            {showConfirmarSenha ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
      </div>

      {confirmarSenha && (
        <div
          className={styles.matchText}
          style={{ color: passwordsMatch ? "#16a34a" : "#ef4444" }}
        >
          {passwordsMatch ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
        </div>
      )}

      {novaSenha && (
        <div className={styles.passwordFeedback}>
          <div className={styles.passwordMeter}>
            <div
              className={styles.meterFill}
              style={{
                width: `${(score / 5) * 100}%`,
                backgroundColor: strengthColor,
              }}
            />
          </div>
          <div className={styles.strengthText} style={{ color: strengthColor }}>
            {strength
              ? strength.charAt(0).toUpperCase() + strength.slice(1)
              : "—"}
          </div>

          <ul className={styles.requirementsList}>
            <li style={{ color: satisfied.length ? "#16a34a" : "#6b7280" }}>
              {satisfied.length ? "✓" : "○"} Mínimo de {rules.minLength}{" "}
              caracteres
            </li>
            <li style={{ color: satisfied.upper ? "#16a34a" : "#6b7280" }}>
              {satisfied.upper ? "✓" : "○"} Uma letra maiúscula (A-Z)
            </li>
            <li style={{ color: satisfied.lower ? "#16a34a" : "#6b7280" }}>
              {satisfied.lower ? "✓" : "○"} Uma letra minúscula (a-z)
            </li>
            <li style={{ color: satisfied.number ? "#16a34a" : "#6b7280" }}>
              {satisfied.number ? "✓" : "○"} Um número (0-9)
            </li>
            <li style={{ color: satisfied.special ? "#16a34a" : "#6b7280" }}>
              {satisfied.special ? "✓" : "○"} Um caractere especial (!@#$...)
            </li>
          </ul>
        </div>
      )}

      <div className={cardStyles.buttonContainer}>
        <button onClick={handleSavePassword} className={cardStyles.botaoSalvar}>
          <FaSave /> Salvar Senha
        </button>
      </div>
    </div>
  );
};

export default AlterarSenhaCard;
