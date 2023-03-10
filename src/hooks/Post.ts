export const showPostsQuantity = (totalPost: number) => {
    if (totalPost === 1) {
        return totalPost + " post";
    }
    return totalPost + " posts";
};
export const showCommentsQuantity = (totalComments: number) => {
    if (totalComments === 1) {
        return totalComments + " comment";
    }
    return totalComments + " comments";
};