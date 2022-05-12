<template>
  <div>
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-semibold leading-tight mb-5">Employees</h2>
          </div>
          <div class="flex flex-col items-end">
            <div class="mb-3">
              <p>Welcome {{ $auth.user.name }}</p>
            </div>
            <div>
              <button
                class="bg-green-600 text-green-200 px-3 py-2 rounded-lg uppercase text-xs font-bold"
                @click="mainModalBox.show = true"
              >
                Add New
              </button>
              <button
                class="bg-red-600 text-red-200 px-3 py-2 rounded-lg ml-1 uppercase text-xs font-bold"
                @click="logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div class="my-2 flex sm:flex-row flex-col">
          <div class="flex flex-row mb-1 sm:mb-0">
            <div class="relative">
              <select
                v-model="filterStatus"
                class="appearance-none h-full rounded-l border-t sm:rounded-r-none sm:border-r-0 border-l border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                @change="filterStatusEmployees()"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="block relative">
            <span
              class="h-full absolute inset-y-0 left-0 flex items-center pl-2"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4 fill-current text-gray-500"
              >
                <path
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                ></path>
              </svg>
            </span>
            <input
              v-model="searchNameValue"
              placeholder="Search by Name"
              class="appearance-none sm:rounded-l-none rounded-r rounded-l border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            class="inline-block min-w-full shadow rounded-lg overflow-hidden"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Created By
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Updated At
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="employee in employees"
                  :key="employee.id"
                  style="height: 80px"
                >
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.id }}
                      </p>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ employee.name }}
                      </p>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ employee.email }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ employee.phone }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ employee.user.name }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p
                      class="capitalize font-semibold whitespace-no-wrap text-center rounded-full px-2 py-1 text-xs"
                      :class="statusBadgeClasses(employee.status)"
                    >
                      {{ employee.status }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ employee.created_at }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ employee.updated_at }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center justify-between">
                      <span
                        class="cursor-pointer"
                        @click="editEmployee(employee)"
                        ><outline-pencil-icon class="w-5 h-5 text-yellow-600"
                      /></span>
                      <span
                        class="cursor-pointer"
                        @click="deleteEmployee(employee.id)"
                        ><outline-trash-icon class="w-5 h-5 text-red-600"
                      /></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
            >
              <span class="text-xs xs:text-sm text-gray-900">
                Showing {{ paginator.firstItem }} to {{ paginator.lastItem }} of
                {{ paginator.total }} Entries
              </span>
              <div class="inline-flex mt-2 xs:mt-0">
                <button
                  class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  @click="paginatePage('prev')"
                >
                  Prev
                </button>
                <button
                  class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                  @click="paginatePage('next')"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="mainModalBox.show"
          class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
        >
          <div
            class="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center bg-green-600 text-white text-xl rounded-t-md px-4 py-3"
            >
              <h3 class="text-lg">
                <span v-if="mainModalBox.type == 'create'"
                  >Add New Employee</span
                >
                <span v-else-if="mainModalBox.type == 'update'"
                  >Edit Employee</span
                >
              </h3>
              <button @click="closeMainModalBox">
                <outline-x-icon class="w-5 h-5 text-white-600" />
              </button>
            </div>

            <!-- Modal body -->
            <div class="p-4">
                <div class="mb-3">
                  <label for="name" class="block text-black">Name</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Name"
                    class="border border-gray-300 mt-1 rounded w-full py-3 px-2 placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="block text-black">Email</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="Email"
                    class="border border-gray-300 mt-1 rounded w-full py-3 px-2 placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="phone" class="block text-black">Phone</label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="text"
                    placeholder="Phone"
                    class="border border-gray-300 mt-1 rounded w-full py-3 px-2 placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
                <div class="text-right">
                  <button
                    class="bg-green-600 text-white px-5 py-2 rounded capitalize"
                    @click.prevent="mainModalBoxAction"
                  >
                    {{ mainModalBox.type }}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'

export default {
  name: 'IndexPage',
  data() {
    return {
      pagiFirst: 5,
      pagiPage: 1,
      filterStatus: 'all',
      searchNameValue: '',
      employees: [],
      paginator: [],
      mainModalBox: {
        show: false,
        type: 'create',
      },
      idForUpdate: 0,
      formData: {
        name: '',
        email: '',
        phone: '',
      },
    }
  },
   computed: {
    mainModalBoxAction() {
      return this.mainModalBox.type === 'create' ? this.addEmployee : this.updateEmployee
    }
  },
  watch: {
    searchNameValue(val) {
      if (val && val !== '') {
        this.searchNameEmployees()
      } else {
        this.fetchEmployees()
      }
    },
  },
  mounted() {
    this.fetchEmployees()
  },
  
  methods: {
    statusBadgeClasses: (status) => {
      return status === 'active'
        ? 'text-green-900 bg-green-200'
        : 'text-red-900 bg-red-200'
    },
    async deleteEmployee(id) {
      const mutation = gql`
        mutation deleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            id
            name
            email
            phone
          }
        }
      `

      const variables = {
        id,
      }

      await this.$graphql.default.request(mutation, variables, {
        authorization: this.$auth.strategy.token.get(),
      })

      this.$toast.success('Successfully deleted')

      this.fetchEmployees()
    },
    closeMainModalBox() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
      }
      this.mainModalBox.show = false
      this.mainModalBox.type = 'create'
    },
    async addEmployee() {
      const mutation = gql`
        mutation createEmployee(
          $name: String!
          $email: String!
          $phone: String!
          $user_id: Int!
        ) {
          createEmployee(
            name: $name
            email: $email
            phone: $phone
            user_id: $user_id
          ) {
            id
            name
            email
            phone
          }
        }
      `

      const variables = {
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        user_id: this.$auth.user.id,
      }

      await this.$graphql.default.request(mutation, variables, {
        authorization: this.$auth.strategy.token.get(),
      })
      this.fetchEmployees()
      this.formData = {
        name: '',
        email: '',
        phone: '',
      }
      this.mainModalBox.show = false
      this.$toast.success('Successfully created')
    },
    editEmployee(employee) {
      this.idForUpdate = employee.id
      this.formData.name = employee.name
      this.formData.email = employee.email
      this.formData.phone = employee.phone
      this.mainModalBox.show = true
      this.mainModalBox.type = 'update'
    },
    async updateEmployee(){
      const mutation = gql`
        mutation updateEmployee($id: ID! , $name: String! , $email: String! , $phone: String! , $user_id: Int!) {
          updateEmployee(id: $id, name: $name, email: $email, phone: $phone, user_id: $user_id) {
            id
            name
            email
            phone
          }
        }
      `

      const variables = {
        id : this.idForUpdate,
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        user_id : this.$auth.user.id
      }

      await this.$graphql.default.request(mutation, variables, {
        authorization: this.$auth.strategy.token.get(),
      })



      this.fetchEmployees()
      this.formData = {
        name: '',
        email: '',
        phone: '',
      }
      this.mainModalBox.show = false
      this.$toast.success('Successfully updated')

    },
    async fetchEmployees() {
      const query = gql`
        query employees($first: Int!, $page: Int!) {
          employees(first: $first, page: $page) {
            data {
              id
              name
              email
              phone
              status
              created_at
              updated_at
              user {
                name
              }
            }
            paginatorInfo {
              total
              count
              firstItem
              lastItem
              hasMorePages
            }
          }
        }
      `
      const variables = { first: this.pagiFirst, page: this.pagiPage }

      const employees = await this.$graphql.default.request(query, variables)
      this.$set(this, 'employees', employees.employees.data)
      this.$set(this, 'paginator', employees.employees.paginatorInfo)
    },
    async filterStatusEmployees() {
      if (this.filterStatus === 'all') {
        this.fetchEmployees()
      } else {
        const query = gql`
          query filterStatusEmployees(
            $status: String!
            $first: Int!
            $page: Int!
          ) {
            filterStatusEmployees(status: $status, first: $first, page: $page) {
              data {
                id
                name
                email
                phone
                status
                created_at
                updated_at
                user {
                  name
                }
              }
              paginatorInfo {
                total
                count
                firstItem
                lastItem
                hasMorePages
              }
            }
          }
        `
        const variables = {
          status: this.filterStatus,
          first: this.pagiFirst,
          page: this.pagiPage,
        }

        const employees = await this.$graphql.default.request(query, variables)
        this.$set(this, 'employees', employees.filterStatusEmployees.data)
        this.$set(
          this,
          'paginator',
          employees.filterStatusEmployees.paginatorInfo
        )
      }
    },
    async searchNameEmployees() {
      const query = gql`
        query searchEmployees($name: String, $first: Int!, $page: Int!) {
          searchEmployees(name: $name, first: $first, page: $page) {
            data {
              id
              name
              email
              phone
              status
              created_at
              updated_at
              user {
                name
              }
            }
            paginatorInfo {
              total
              count
              firstItem
              lastItem
              hasMorePages
            }
          }
        }
      `
      const variables = {
        name: `%${this.searchNameValue}%`,
        first: 5,
        page: 1,
      }

      const employees = await this.$graphql.default.request(query, variables)
      this.$set(this, 'employees', employees.searchEmployees.data)
      this.$set(this, 'paginator', employees.searchEmployees.paginatorInfo)
    },
    async paginatePage(action) {
      switch (action) {
        case 'next':
          if (this.paginator.hasMorePages) {
            this.pagiPage++
          }
          break
        case 'prev':
          if (this.pagiPage >= 2) {
            this.pagiPage--
          }
      }

      await this.fetchEmployees()
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.error('Successfully logout')
      await this.$router.push('/auth/login')
    },
  },
}
</script>
