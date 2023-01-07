import { Submissions } from './sections';

const data = [];
for (let i = 0; i <= 20; i++) {
  data.push({
    id: `3fa85f64-5717-4562-b3fc-2c963f66afa6${i}`,
    title: `Article Title ${i}`,
    bodyText: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
    imagePath: `/article.jpg`,
    visibility: true,
    articleStatus: 'string',
    articleCategories: [
      {
        categoryId: `3fa85f64-5717-4562-b3fc-2c963f66afa6${i}`,
        category: {
          id: `3fa85f64-5717-4562-b3fc-2c963f66afa6${i}`,
          name: 'ARTICLE CATEGORY',
          description: 'string',
          parentCategoryId: `3fa85f64-5717-4562-b3fc-2c963f66afa6${i}`,
          categoryType: '0 = ProductServices',
        },
      },
    ],
  });
}

export const List = () => {
  return (
    <div className="p-[40px]">
      {/* Current Active Screen */}
      <Submissions articles={data} />
    </div>
  );
};
