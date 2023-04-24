

describe("user Controller Function test", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it("should insert", () => {
        const ID_RETURNED_BY_DB = 10
        const reqMock = {
            body: {
                name: "mahmoud",
                phone: "1234567910",
                email: "hello@gmail.com",
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(200);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.data.userId).toBe(ID_RETURNED_BY_DB);
                expect(x.ok).toBe(true);
            })
        }
        jest.doMock("../model/users", () => ({
            usersModel: {
                create: jest.fn(async (x) => {
                    expect(x.name).toBe("mahmoud");
                    expect(x.phone).toBe("1234567910");
                    expect(x.email).toBe("hello@gmail.com");
                    return { id: ID_RETURNED_BY_DB }
                })
            }
        }))
        require("./users").addUser(reqMock, resMock)
    })

    it("should not insert", () => {
        const EXAMPLE_ERROR = "MockedError"
        jest.doMock("../model/users", () => ({
            usersModel: {
                create: jest.fn(async () => {
                    throw new Error(EXAMPLE_ERROR);
                })
            }
        }));
        const reqMock = {
            body: {
                name: "hello"
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(500);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.ok).toBe(false);
                expect(x.message).toBe(EXAMPLE_ERROR)
            })
        }
        require("./users").addUser(reqMock, resMock)
    })

    it("should Delete", async () => {
        const searchId = "id";
        const destroyMock = jest.fn(async () => { })
        jest.doMock("../model/users", () => ({
            usersModel: {
                findByPk: jest.fn(async (x) => {
                    expect(x).toBe(searchId)
                    return {
                        destroy: destroyMock,
                    }
                })
            }
        }));
        const reqMock = {
            params: {
                userId: searchId
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(200);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.deletedId).toBe(searchId);
                expect(x.ok).toBe(true);
            })
        };
        await require("./users").deleteUser(reqMock, resMock,)
        expect(destroyMock).toBeCalled()
    })

    it("should not delete", () => {
        const searchId = "id";
        jest.doMock("../model/users", () => ({
            usersModel: {
                findByPk: jest.fn(async (x) => {
                    expect(x).toBe(searchId)
                    return null
                })
            }
        }));
        const reqMock = {
            params: {
                userId: searchId
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(500);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.ok).toBe(false);
                expect(x.message).toBe("user does not Exist")
            })
        };
        require("./users").deleteUser(reqMock, resMock,)
    })

    it("should edit", async () => {
        const USER_ID = "id";
        const reqMock = {
            body: {
                name: "mahmoud",
                phone: "012345678910",
                email: "zaky@gmail.com",
            },
            params: {
                userId: USER_ID,
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(200);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.ok).toBe(true);
            })
        };
        const saveMock = jest.fn(async () => {

        })
        const userMock = {
            save: saveMock, id: USER_ID,
            dataValues: {
                name: " ", phone: " ",
                email: " ",
            }
        }
        jest.doMock("../model/users", () => ({
            usersModel: {
                findByPk: jest.fn(x => {
                    expect(x).toBe(USER_ID);
                    return userMock
                }),
            }
        }));
        await require("./users").editUser(reqMock, resMock)
        expect(saveMock).toBeCalled();
    })


    it("should not edit", async () => {
        const USER_ID = "id";
        const MOCK_ERROR = "sad"
        const reqMock = {
            body: {
                name: "mahmoud",
                phone: "012345678910",
                email: "zaky@gmail.com",
            },
            params: {
                userId: USER_ID,
            }
        };
        const resMock = {
            status: jest.fn((x) => {
                expect(x).toBe(500);
                return resMock
            }),
            json: jest.fn((x) => {
                expect(x.ok).toBe(false);
                expect(x.message).toBe(MOCK_ERROR)
            })
        };
        const saveMock = jest.fn(async () => {
                throw new Error(MOCK_ERROR)
        });
        const userMock = {
            save: saveMock, id: USER_ID,
        }
        jest.doMock("../model/users", () => ({
            usersModel: {
                findByPk: jest.fn(x => {
                    expect(x).toBe(USER_ID);
                    return userMock
                }),
            }
        }));
        await require("./users").editUser(reqMock, resMock)
        expect(saveMock).toBeCalled();
    })

})