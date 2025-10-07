import { GridContainer, GridContainerProps } from "@/components/GridContainer";
import Comments from "@/components/UIPageComponents/Comments";
import Details from "@/components/UIPageComponents/Details";
import UILayout from "@/components/UIPageComponents/Layout";
import NavigationPath from "@/components/UIPageComponents/NavigationPath";
import RatingAndReviews from "@/components/UIPageComponents/RatingAndReviews";
import SimilarItems from "@/components/UIPageComponents/SimilarItems";
import Slider from "@/components/UIPageComponents/Slider";

function page() {
  const layout = [
    {
      columns: "1fr",
      height: "50px",
      items: [{ id: "NavigationPath", span: 1 }],
    },
    {
      columns: "1fr 1fr 1fr",
      items: [
        {
          id: "Slider",
          span: 1,
          media: [{ breakpoint: "lg", widthCondition: "exactmin", span: 3 }],
        },
        {
          id: "Details",
          span: 2,
          media: [{ breakpoint: "lg", widthCondition: "max", hidden: true }],
        },
      ],
    },
    {
      columns: "1fr",
      items: [
        {
          id: "Details",
          span: 1,
          media: [{ breakpoint: "lg", widthCondition: "min", hidden: true }],
        },
      ],
    },
    {
      columns: "1fr",
      items: [{ id: "RatingAndReviews", span: 1 }],
    },
    {
      columns: "1fr",
      items: [{ id: "Comments", span: 1 }],
    },
    {
      columns: "1fr",
      items: [{ id: "SimilarItems", span: 1 }],
    },
  ] as GridContainerProps["layout"];
  const chile = {
    NavigationPath: <NavigationPath />,
    Slider: <Slider />,
    Details: <Details />,
    RatingAndReviews: <RatingAndReviews />,
    Comments: <Comments />,
    SimilarItems: <SimilarItems />,
  };
  return (
    <UILayout>
      <GridContainer
        gap={13}
        id='ui'
        layout={layout}>
        {chile}
      </GridContainer>
    </UILayout>
  );
}

export default page;
