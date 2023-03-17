export type CodeElement = { type: "code"; children: CustomText[] };
export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type CustomText = { text: string };

export type CustomElement = CodeElement | ParagraphElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
