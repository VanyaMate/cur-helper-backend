/*
const [ themes ] = await this._mongoThemeRepository.aggregate([
    {
        $match: { publicId },
    },
    {
        $lookup: {
            from    : 'thememodels',
            let     : { parentId: '$publicId' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $regexMatch: {
                                input: '$publicId',
                                regex: { $concat: [ '^', '$$parentId', '.+' ] },
                            },
                        },
                    },
                },
                {
                    $limit: 3,
                },
            ],
            as      : 'children',
        },
    },
    {
        $lookup: {
            from    : 'thememodels',
            let     : { parentIds: { $split: [ '$publicId', '-' ] } },
            pipeline: [
                {
                    $match: {
                        $expr: { $in: [ '$publicId', { $slice: [ '$$parentIds', 1, { $subtract: [ { $size: { $ifNull: [ '$$parentIds', [] ] } }, 1 ] } ] } ] },
                    },
                },
            ],
            as      : 'breadcrumbs',
        },
    },
]);*/
