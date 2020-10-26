# **Fancy TODOS**

## **Add TODOS (CREATE)**

### **Menambahkan data TODO.**

-   **URL**

		localhost:3000/todos
		
- **Data Params**
	**Body:**

		{
			title : String,
			descriptions: String,
			status: Boolean,
			due_date: Date
		}
 
-   **Method:** 
 
    `POST` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
    -   **Code:**  201 
        **Content:** 

	        {
				title : String,
				descriptions: String ,
				status: Boolean,
				due_date: Date
			}

-   **Error Response:** 
 
    -   **Code:**  400 
        **Content:**
        
	        { error : "Validation Errors" }
 
     - **Code:**  500
        **Content:** 

			{ error : "Internal Server Error" }

---

## **Show TODOS (READ)**

### **Menampilkan data TODOS berupa JSON.**

-   **URL**

		localhost:3000/todos
 
-   **Method:** 

    `GET` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
    -   **Code:**  200 
        **Content:**

			[
				{ id : integer }
			]

-   **Error Response:** 
 
    -   **Code:**  500 
        **Content:** 

			{ error : "Internal Server Error" }
 
 ---
## **Show TODOS by ID (READ)**

### **Menampilkan data TODO berupa JSON berdasarkan ID.**

-   **URL**

		localhost:3000/todos/:id
		
- **URL Params**

	**Required:**

		`id=[integer]`
 
-   **Method:** 
 
    `GET` 
 
-   **Success Response:**
	   Data yang di kembalikan : 

    -   **Code:**  200 
        **Content:** 

			{ todo }

-   **Error Response:** 

    -   **Code:**  404 
        **Content:**

			{ error : "Not Found" }
 
---
## **Replace TODOS (UPDATE)**

### **Merubah keseluruhan data TODOS.**

-   **URL**

		localhost:3000/todos/:id

-   **Method:** 
 
    `PUT` 
		
 - **Data Params**
	**Body:**

		{
			title : String,
			descriptions: String,
			status: String,
			due_date: Date
		}
 
-   **Success Response:**
	   Data yang di kembalikan : 

    -   **Code:**  200 
        **Content:** 
         
	        {
				title : String,
				descriptions: String,
				status: Boolean,
				due_date: Date
			}
 
-   **Error Response:** 
 
    -   **Code:**  404 
        **Content:**

			{ error : "Todo not found" }

      - **Code:**  400 
        **Content:** 

			{ error : "Validation Errors" }

       - **Code:**  500
        **Content:** 

			 { error : "Internal Server Errors" }

---
## **Replace Some TODOS (UPDATE)**

### **Merubah sebagian data TODOS.**

-   **URL**

		localhost:3000/todos/:id
		
-   **Method:** 
 
    `PATCH` 
		
 - **Data Params**
	**Body:**

		{
			status: ""
		}
 
 
 
-   **Success Response:**
	   Returned data : Todo item
 
    -   **Code:**  200 
        **Content:** 
        
	        {
				title : String,
				descriptions: String,
				status: String,
				due_date: Date
			}
 
-   **Error Response:** 
 
    -   **Code:**  404 
        **Content:** 
        
			 { error : "Todo not found" }

      - **Code:**  400 
        **Content:** 

			{ error : "Validation Errors" }
       - **Code:**  500
        **Content:** 

			 { error : "Internal Server Errors" }

---
## **DELETE  TODO (DELETE)**

### **Menghapus data TODOS berdasarkan ID.**

-   **URL**

		localhost:3000/todos/:id
		
- **Data Params**
	**Body:**

		{
			id: integer
		}
 
-   **Method:** 
 
    `DELETE` 
 
-   **Success Response:**
	   Returned data : Todo item 
 
    -   **Code:**  201 
        **Content:**

			{ message : 'todo success to delete' }
 
-   **Error Response:** 
 
    -   **Code:**  404
        **Content:** 

			{ error : "Todo Not found" }
    
     - **Code:**  500
        **Content:** 

			{ error : "Internal Server Error" }
