// Static dashboard mockup for the screenshot asset — grounded in
// featherless.ai model catalog + "One API key. Instant access." positioning
import React from "react";
import { colors, font } from "./theme";

const models = [
  { name: "zai-org/GLM-5.3", tag: "Reasoning & agents", params: "753B", latency: "89ms", calls: "552k" },
  { name: "deepseek-ai/DeepSeek-V4-Pro", tag: "Frontier chat", params: "862B", latency: "112ms", calls: "1.6M" },
  { name: "moonshotai/Kimi-K3", tag: "Multimodal MoE agent", params: "1T", latency: "104ms", calls: "2.1k" },
  { name: "openai/gpt-oss-120b", tag: "Frontier reasoning", params: "120B", latency: "87ms", calls: "2.9M" },
  { name: "Qwen/Qwen3.6-27B", tag: "Efficient reasoning", params: "27B", latency: "61ms", calls: "8.4M" },
];

const stats = [
  { label: "Models served", value: "40,000+" },
  { label: "API keys", value: "1" },
  { label: "Cold starts", value: "0" },
];

export const DashboardMock: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: font.family,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 84,
          display: "flex",
          alignItems: "center",
          gap: 28,
          padding: "0 40px",
          borderBottom: `1px solid ${colors.faint}`,
          flexShrink: 0,
        }}
      >
        {/* logo mark */}
        <svg width="40" height="40" viewBox="0 0 48 48">
          <g fill="none" stroke={colors.primary} strokeWidth="4" strokeLinecap="round">
            <path d="M 8 42 C 8 22, 20 10, 42 6" />
            <path d="M 8 42 C 15 31, 26 24, 42 20" />
          </g>
          <g stroke={colors.primary} strokeWidth="3" strokeLinecap="round" opacity="0.7">
            <path d="M 20 17 C 27 20, 33 22, 39 23" />
            <path d="M 24 26 C 31 29, 37 30, 43 31" opacity="0.7" />
            <path d="M 29 35 C 35 37, 40 38, 45 39" opacity="0.5" />
          </g>
        </svg>
        <span style={{ fontSize: 22, fontWeight: 700 }}>featherless</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 17, color: colors.muted }}>Models</span>
        <span style={{ fontSize: 17, color: colors.muted }}>Pricing</span>
        <span style={{ fontSize: 17, color: colors.muted }}>Docs</span>
        <div
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 8,
            padding: "9px 22px",
          }}
        >
          Get API key
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 240,
            borderRight: `1px solid ${colors.faint}`,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flexShrink: 0,
          }}
        >
          {["Overview", "API keys", "Usage", "Models", "Billing", "Docs"].map((item, i) => (
            <div
              key={item}
              style={{
                fontSize: 17,
                color: i === 0 ? colors.text : colors.muted,
                fontWeight: i === 0 ? 600 : 400,
                backgroundColor: i === 0 ? colors.surface : "transparent",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              {item}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 14, color: colors.muted }}>v2 · us-east</div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: "36px 44px", display: "flex", flexDirection: "column", gap: 30, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>Models</span>
            <span style={{ fontSize: 17, color: colors.muted }}>40,000+ available · one API key</span>
          </div>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 20 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: 14,
                  padding: "22px 26px",
                  border: `1px solid ${colors.faint}`,
                }}
              >
                <div style={{ fontSize: 15, color: colors.muted, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: s.value === "0" ? colors.accent : colors.text }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div
            style={{
              flex: 1,
              backgroundColor: colors.surface,
              borderRadius: 14,
              border: `1px solid ${colors.faint}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "16px 26px",
                fontSize: 14,
                color: colors.muted,
                gap: 16,
                borderBottom: `1px solid ${colors.faint}`,
                flexShrink: 0,
              }}
            >
              <span style={{ width: 400 }}>MODEL</span>
              <span style={{ width: 220 }}>CLASS</span>
              <span style={{ width: 110 }}>PARAMS</span>
              <span style={{ width: 130 }}>P50 LATENCY</span>
              <span style={{ width: 130, textAlign: "right" }}>CALLS / MO</span>
            </div>
            {models.map((m) => (
              <div
                key={m.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "22px 26px",
                  gap: 16,
                  borderBottom: `1px solid ${colors.faint}`,
                }}
              >
                <span style={{ width: 400, fontFamily: font.mono, fontSize: 17 }}>{m.name}</span>
                <span style={{ width: 220, fontSize: 16, color: colors.muted }}>{m.tag}</span>
                <span style={{ width: 110, fontSize: 16, color: colors.muted }}>{m.params}</span>
                <span style={{ width: 130, fontSize: 16, color: colors.accent }}>{m.latency}</span>
                <span style={{ width: 130, fontSize: 16, textAlign: "right", color: colors.muted }}>{m.calls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};