const http = {
  find_: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init);
    if (resp.status == 200) {
      const { code, data, message } = await resp.json();
      if(code === 200) return data;
      throw new Error(message);
    } else {
      throw new Error('请求失败');
    }
  },
  findOne_: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init);
    if (resp.status == 200) {
      const { code, data, message } = await resp.json();
      if(code === 200) return data;
      throw new Error(message);
    } else {
      throw new Error('请求失败')
    }
  },

  get: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init)
    if (resp.status == 200) {
      const data = await resp.json()
      if (data.code === 0) {
        return data.data
      }
      throw new Error(data.message)
    } else {
      throw new Error('请求失败')
    }
  },

  getAll: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init)
    if (resp.status == 200) {
      return resp.json();
    } else {
      throw new Error('请求失败')
    }
  },

  post: async ([url, body]: any[]) => {
    console.log("post:", url, body);
    const resp = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    if (resp.status == 200) {
      const data = await resp.json()
      if (data.code === 0) {
        return data.data
      }
      throw new Error(data.message)
    } else {
      throw new Error('请求失败')
    }
  }

}

export default http