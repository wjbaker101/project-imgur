module.exports = {

    devServer: {
        proxy: {
            '/api': {
                target: 'https://localhost:44352',
                ws: true,
            },
        },
    },
};