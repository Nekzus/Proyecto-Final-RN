import petQuestApi from '../api/petQuestApi';

export const uploadImage = async (collection = 'productos', data, id) => {
  try {
    const fileToUpload = {
      uri: data[0].uri,
      type: 'image/*',
      name: data[0].fileName || 'Image',
    };
    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    const resp = await petQuestApi.put(`/uploads/${collection}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading image');
  }
};
