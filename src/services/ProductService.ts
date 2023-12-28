import recombeeClient from "../recombee";

const service = {
  createProductPropertiesToRecombee: async (data: {
    [key: string]:
      | "int"
      | "double"
      | "string"
      | "boolean"
      | "timestamp"
      | "set"
      | "image"
      | "imageList";
  }) => {
    return await Promise.all(
      Object.keys(data).map(async (item) => {
        const field = item;
        const requestRecombee = new recombeeClient.rqs.AddItemProperty(
          field,
          data[field],
        );
        requestRecombee.timeout = 20000;
        return await recombeeClient.client.send(requestRecombee);
      }),
    )
      .then((res) => {
        console.log("res :>> ", res);
        return {
          success: true,
          message: "Thêm property product thành công",
        };
      })
      .catch((err) => ({
        success: false,
        message: "Thêm property product thất bại",
      }));
  },

  createProductToRecombee: async (product: any, type: "pet" | "accessory") => {
    const result = {
      success: false,
      message: "",
    };
    if (product.sku && product.name) {
      const requestRecombee = new recombeeClient.rqs.SetItemValues(
        `${product.sku}`,
        {
          name: product.name,
          type: type,
          //   thumbnail_image: product.thumbnail_image,
        },
        {
          cascadeCreate: true,
        },
      );
      requestRecombee.timeout = 20000;

      await recombeeClient.client
        .send(requestRecombee)
        .then((response) => {
          console.log("response :>> ", response);
          result.success = true;
          result.message = "Thêm product thành công vào recombee";
        })
        .catch((error) => {
          console.log("error :>> ", error);
          result.message = "Thêm product thất bại vào recombee";
        });
    } else {
      result.message = "Thiếu field khi thêm product vào recombee";
    }
    return result;
  },
};

export default service;
