

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

    it("should not delete",async()=>{
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
        await require("./users").deleteUser(reqMock, resMock,)
    })

})