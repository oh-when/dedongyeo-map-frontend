/**
 * TODO: Schema Type Generation 도입
 * 일단은 Type Alias랑 Type Utilities 만 잘 써도, 그렇게 귀찮지는 않음
 * - Nestied Pick Utility가 필요함.
 */
declare namespace GQL {
  export enum ImageThemeType {
    dark = 'dark',
    light = 'light',
    street = 'street',
  }
  export enum SortType {
    distance = 'distance',
    accuracy = 'accuracy',
  }
  export type Course = {
    _id: string;
    endAt: number;
    isShare: boolean;
    partners: string[];
    startAt: number;
    stickers: Array<GQL.Sticker>;
    title: string;
  };
  export type CourseSearchInput = {
    endAt?: number;
    ids?: string[];
    isShare?: boolean;
    partners?: string[];
    startAt?: number;
    title?: string;
  };
  export type CreateCourseImageInput = {
    theme: GQL.ImageThemeType;
    width: number;
    height: number;
  };
  export type CreateCourseInput = {
    isShare?: boolean;
    stickers?: string[];
    title?: string;
  };
  export type CreateCustomSpotInput = {
    place_name: string;
    x: number;
    y: number;
    category_group_name: string;
    is_custom?: boolean;
    is_custom_share?: boolean;
  };
  export type CreateStickerInput = {
    address_name?: string;
    category_group_code?: string;
    category_group_name?: string;
    category_name?: string;
    distance?: string;
    endAt: number;
    is_used?: boolean;
    partners?: string[];
    phone?: string;
    place_id: string;
    place_name: string;
    place_url?: string;
    road_address_name?: string;
    startAt: number;
    sticker_index: number;
    sweet_percent: number;
    x: number;
    y: number;
  };
  export type DeleteSpotDto = {
    ok: number;
    n: number;
    deletedCount: number;
  };
  export type KeywordSearchDto = {
    query: string;
    category_group_code?: string;
    x?: number;
    y?: number;
    radius?: number;
    rect?: string;
    page?: number;
    size?: number;
    sort?: SortType;
  };
  export type PageInfo = {
    total_count: number;
    is_end: boolean;
    total_page_count: number;
    cur_page: number;
  };
  export type PaginatedPlace = {
    pageInfo: PageInfol;
    places: Array<GQL.Place>;
  };
  export type Place = {
    id: string;
    place_name: string;
    category_name?: string;
    category_group_code?: string;
    category_group_name?: string;
    phone?: string;
    address_name?: string;
    road_address_name?: string;
    place_url?: string;
    distance?: string;
    x?: number;
    y?: number;
  };
  export type SearchSpotDto = {
    keyword?: string;
    x?: number;
    y?: number;
    radius?: number;
  };
  export type Spot = {
    _id: string;
    place_id: string;
    stickers: Array<GQL.Sticker>;
    place_name: string;
    category_name?: string;
    category_group_code?: string;
    category_group_name?: string;
    phone?: string;
    address_name?: string;
    road_address_name?: string;
    place_url?: string;
    distance?: string;
    x?: number;
    y?: number;
    is_custom?: boolean;
    is_custom_share?: boolean;
  };
  export type Sticker = {
    _id: string;
    sticker_index: number;
    sweet_percent: number;
    is_used: boolean;
    startAt: number;
    endAt: number;
    partners: string[];
    spot: Spot;
  };
  export type UpdateCustomSpotInput = {
    place_name?: string;
    x?: number;
    y?: number;
    category_group_name?: string;
    is_custom?: boolean;
    is_custom_share?: boolean;
    _id: string;
  };
  export type UpdateStickerInput = {
    _id: string;
    is_used: boolean;
  };

  export namespace Query {
    export namespace Place {
      export type Variables = {
        filters: GQL.KeywordSearchDto;
      };
      export type Data = {
        place: GQL.PaginatedPlace;
      };
    }
    export namespace Spot {
      export type Variables = {
        place_id: string;
      };
      export type Data = {
        spot: GQL.Spot;
      };
    }
    export namespace Spots {
      export type Variables = {
        searchSpotDto?: SearchSpotDto;
      };
      export type Data = {
        spots: Array<GQL.Spot>;
      };
    }
    export namespace Stickers {
      export type Data = {
        stickers: Array<GQL.Sticker>;
      };
    }
    export namespace Sticker {
      export type Variables = {
        id: string;
      };
      export type Data = {
        sticker: GQL.Sticker;
      };
    }
    export namespace Courses {
      export type Variables = {
        searchCourseInput: GQL.CourseSearchInput;
      };
      export type Data = {
        courses: GQL.Course[];
      };
    }
    export namespace Course {
      export type Variables = {
        courseId: string;
      };
      export type Data = {
        course: GQL.Course;
      };
    }
  }
  export namespace Mutation {
    export namespace RemoveSpot {
      export type Variables = {
        id: string;
      };
      export type Data = {
        removeSpot: DeleteSpotDto;
      };
    }
    export namespace CreateCustomSpot {
      export type Variables = {
        createCustomSpotInput: GQL.CreateCustomSpotInput;
      };
      export type Data = {
        createCustomSpot: GQL.Spot;
      };
    }
    export namespace UpdateCustomSpot {
      export type Variables = {
        updateCustomSpotInput: GQL.UpdateCustomSpotInput;
      };
      export type Data = {
        updateCustomSpot: GQL.Spot;
      };
    }
    export namespace CreateSticker {
      export type Variables = {
        createStickerInput: GQL.CreateStickerInput;
      };
      export type Data = {
        createSticker: GQL.Sticker;
      };
    }
    export namespace UpdateSticker {
      export type Variables = {
        updateStickerInput: GQL.UpdateStickerInput;
      };
      export type Data = {
        updateSticker: GQL.Sticker;
      };
    }
    export namespace CreateCourse {
      export type Variables = {
        createCourseInput: GQL.CreateCourseInput;
      };
      export type Data = {
        createCourse: GQL.Course;
      };
    }
    export namespace RemoveCourse {
      export type Variables = {
        id: string;
      }
      export type Data = {
        removeCourse: {
          n: number;
          ok: number;
        }
      }
    }
  }
}
