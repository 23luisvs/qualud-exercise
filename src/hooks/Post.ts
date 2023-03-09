export const showPostsQuantity = (totalPost: number) => {
    if (totalPost === 1) {
        return totalPost + " post";
    }
    return totalPost + " posts";
};