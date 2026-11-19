import fs from "node:fs";
import path from "node:path";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";

// Token colours measured from heroui.com's docs code blocks (computed --shiki-light / --shiki-dark values).
const light: ThemeRegistration = {
	name: "docs-light",
	type: "light",
	colors: { "editor.foreground": "#52525B", "editor.background": "#00000000" },
	settings: [
		{ settings: { foreground: "#52525B" } },
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#A1A1AA" } },
		{ scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.control", "keyword.operator.expression", "constant.language.import-export-all"], settings: { foreground: "#D6336C" } },
		{ scope: ["keyword.operator.arrow", "storage.type.function.arrow"], settings: { foreground: "#D6336C" } },
		{ scope: ["string", "string.quoted", "string.template", "punctuation.definition.string"], settings: { foreground: "#0369A1" } },
		{ scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function", "entity.other.attribute-name"], settings: { foreground: "#7C3AED" } },
		{ scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type.primitive"], settings: { foreground: "#18181B" } },
		{ scope: ["constant.numeric", "constant.language"], settings: { foreground: "#0369A1" } },
	],
};
const dark: ThemeRegistration = {
	name: "docs-dark",
	type: "dark",
	colors: { "editor.foreground": "#A1A1AA", "editor.background": "#00000000" },
	settings: [
		{ settings: { foreground: "#A1A1AA" } },
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#71717A" } },
		{ scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.control", "keyword.operator.expression", "constant.language.import-export-all"], settings: { foreground: "#F38BA8" } },
		{ scope: ["keyword.operator.arrow", "storage.type.function.arrow"], settings: { foreground: "#F38BA8" } },
		{ scope: ["string", "string.quoted", "string.template", "punctuation.definition.string"], settings: { foreground: "#7CC4FF" } },
		{ scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function", "entity.other.attribute-name"], settings: { foreground: "#C4B5FD" } },
		{ scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type.primitive"], settings: { foreground: "#FAFAFA" } },
		{ scope: ["constant.numeric", "constant.language"], settings: { foreground: "#7CC4FF" } },
	],
};

let hl: Promise<Highlighter> | undefined;
function getHl() {
	hl ??= createHighlighter({ themes: [light, dark], langs: ["tsx"] });
	return hl;
}

export function readExample(name: string) {
	return fs.readFileSync(path.join(process.cwd(), "components/docs/examples", `${name}.tsx`), "utf8").replace(/\t/g, "  ").trimEnd();
}

export async function highlight(code: string) {
	const h = await getHl();
	return h.codeToHtml(code, {
		lang: "tsx",
		themes: { light: "docs-light", dark: "docs-dark" },
		defaultColor: false,
	});
}
