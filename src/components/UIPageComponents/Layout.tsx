import { GridContainer, GridContainerProps } from "@/components/GridContainer";
import UIHeader from "@/components/UIPageComponents/Header";
import UIFooter from "@/components/UIPageComponents/Footer";

export default function UILayout({ children }: { children: React.ReactNode }) {
  const layout = [
    { columns: "1fr", height: "100px", items: [{ id: "header", span: 1 }] },
    { columns: "1fr", items: [{ id: "body", span: 1 }] },
    { columns: "1fr", height: "100px", items: [{ id: "footer", span: 1 }] },
  ] as GridContainerProps["layout"];

  const chile = {
    header: <UIHeader />,
    body: <div className='container mx-auto p-8'>{children}</div>,
    footer: <UIFooter />,
  };

  return (
    <GridContainer
      gap={0}
      id='layout'
      layout={layout}>
      {chile}
    </GridContainer>
  );
}
