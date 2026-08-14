/* Design tokens da Axípeto — compartilhado por todas as páginas.
   Precisa ser carregado DEPOIS do CDN do Tailwind e ANTES do conteúdo. */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                /* Superfícies — tema claro "Kinetic Axis" */
                "surface":       "#FFFFFF",  /* Fundo principal        */
                "surface-alt":   "#FAFAFA",  /* Seções de contraste    */
                "surface-pure":  "#FFFFFF",  /* Cards sobre surface-alt*/

                /* Marca */
                "accent":        "#FEB700",  /* Axípeto Amber Gold     */
                "accent-soft":   "#FFD56B",  /* Warm Glow              */
                "bronze":        "#927236",  /* Bronze Earth           */
                "spark":         "#00D7FE",  /* Cyan Spark             */

                /* Texto */
                "ink":           "#1F1B13",  /* Deep Charcoal Ink      */
                "ink-muted":     "#7F7668",  /* Muted Slate            */
                "ink-faint":     "#B3AA9C",

                /* Traços */
                "hairline":      "rgba(31, 27, 19, 0.10)",
                "hairline-soft": "rgba(31, 27, 19, 0.05)"
            },
            borderRadius: {
                "sm": "0.25rem",
                DEFAULT: "0.5rem",
                "md": "0.75rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "full": "9999px"
            },
            spacing: {
                "stack-sm": "0.5rem",
                "stack-md": "1rem",
                "stack-lg": "2rem",
                "gutter": "1.5rem",
                "margin-mobile": "1.5rem",
                "margin-desktop": "5rem",
                "section-gap": "10rem"
            },
            fontFamily: {
                "display": ["Syne", "system-ui", "sans-serif"],
                "body":    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
                "mono":    ["JetBrains Mono", "ui-monospace", "monospace"]
            },
            fontSize: {
                "display-xl":        ["80px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "display-xl-mobile": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "headline-lg":        ["48px", { lineHeight: "1.2", fontWeight: "700" }],
                "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
                "headline-md":        ["32px", { lineHeight: "1.3", fontWeight: "600" }],
                "body-lg":   ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "body-md":   ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "label-mono":["14px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }]
            }
        }
    }
}
