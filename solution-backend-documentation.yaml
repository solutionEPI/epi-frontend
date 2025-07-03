openapi: 3.0.3
info:
  title: Solution Epi API
  version: 0.1.0
  description: A modern Django admin interface with auto-generated REST API for any
    Django project.
paths:
  /api/admin/:
    get:
      operationId: api_admin_retrieve
      description: Return configuration for the entire admin site
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          description: No response body
  /api/admin/dashboard-stats/:
    get:
      operationId: api_admin_dashboard_stats_retrieve
      description: Provides statistics for the admin dashboard.
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          description: No response body
  /api/admin/models/adminpreferences/:
    get:
      operationId: api_admin_models_adminpreferences_list
      parameters:
      - in: query
        name: density
        schema:
          type: string
          enum:
          - comfortable
          - compact
        description: |-
          * `compact` - Compact
          * `comfortable` - Comfortable
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      - in: query
        name: theme
        schema:
          type: string
          enum:
          - dark
          - light
          - system
        description: |-
          * `light` - Light
          * `dark` - Dark
          * `system` - System Default
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedAdminPreferencesAdminList'
          description: ''
    post:
      operationId: api_admin_models_adminpreferences_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
  /api/admin/models/adminpreferences/{id}/:
    get:
      operationId: api_admin_models_adminpreferences_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Admin Preference.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
    put:
      operationId: api_admin_models_adminpreferences_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Admin Preference.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
    patch:
      operationId: api_admin_models_adminpreferences_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Admin Preference.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedAdminPreferencesAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedAdminPreferencesAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedAdminPreferencesAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
    delete:
      operationId: api_admin_models_adminpreferences_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Admin Preference.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/adminpreferences/bulk_action/:
    post:
      operationId: api_admin_models_adminpreferences_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
  /api/admin/models/adminpreferences/config/:
    get:
      operationId: api_admin_models_adminpreferences_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
  /api/admin/models/adminpreferences/export/:
    get:
      operationId: api_admin_models_adminpreferences_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
  /api/admin/models/adminpreferences/import/:
    post:
      operationId: api_admin_models_adminpreferences_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/AdminPreferencesAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminPreferencesAdmin'
          description: ''
  /api/admin/models/category/:
    get:
      operationId: api_admin_models_category_list
      parameters:
      - in: query
        name: is_active
        schema:
          type: boolean
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - in: query
        name: parent
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedCategoryAdminList'
          description: ''
    post:
      operationId: api_admin_models_category_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
  /api/admin/models/category/{id}/:
    get:
      operationId: api_admin_models_category_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
    put:
      operationId: api_admin_models_category_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
    patch:
      operationId: api_admin_models_category_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedCategoryAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
    delete:
      operationId: api_admin_models_category_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/category/bulk_action/:
    post:
      operationId: api_admin_models_category_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
  /api/admin/models/category/config/:
    get:
      operationId: api_admin_models_category_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
  /api/admin/models/category/export/:
    get:
      operationId: api_admin_models_category_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
  /api/admin/models/category/import/:
    post:
      operationId: api_admin_models_category_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CategoryAdmin'
          description: ''
  /api/admin/models/comment/:
    get:
      operationId: api_admin_models_comment_list
      parameters:
      - in: query
        name: created_at
        schema:
          type: string
          format: date-time
      - in: query
        name: is_approved
        schema:
          type: boolean
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedCommentAdminList'
          description: ''
    post:
      operationId: api_admin_models_comment_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
  /api/admin/models/comment/{id}/:
    get:
      operationId: api_admin_models_comment_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
    put:
      operationId: api_admin_models_comment_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
    patch:
      operationId: api_admin_models_comment_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedCommentAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedCommentAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedCommentAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
    delete:
      operationId: api_admin_models_comment_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/comment/bulk_action/:
    post:
      operationId: api_admin_models_comment_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
  /api/admin/models/comment/config/:
    get:
      operationId: api_admin_models_comment_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
  /api/admin/models/comment/export/:
    get:
      operationId: api_admin_models_comment_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
  /api/admin/models/comment/import/:
    post:
      operationId: api_admin_models_comment_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentAdmin'
          description: ''
  /api/admin/models/emailsettings/:
    get:
      operationId: api_admin_models_emailsettings_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedEmailSettingsAdminList'
          description: ''
    post:
      operationId: api_admin_models_emailsettings_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
  /api/admin/models/emailsettings/{id}/:
    get:
      operationId: api_admin_models_emailsettings_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Email Settings.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
    put:
      operationId: api_admin_models_emailsettings_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Email Settings.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
    patch:
      operationId: api_admin_models_emailsettings_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Email Settings.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedEmailSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedEmailSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedEmailSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
    delete:
      operationId: api_admin_models_emailsettings_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Email Settings.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/emailsettings/bulk_action/:
    post:
      operationId: api_admin_models_emailsettings_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
  /api/admin/models/emailsettings/config/:
    get:
      operationId: api_admin_models_emailsettings_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
  /api/admin/models/emailsettings/export/:
    get:
      operationId: api_admin_models_emailsettings_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
  /api/admin/models/emailsettings/import/:
    post:
      operationId: api_admin_models_emailsettings_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/EmailSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EmailSettingsAdmin'
          description: ''
  /api/admin/models/filestoragesettings/:
    get:
      operationId: api_admin_models_filestoragesettings_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedFileStorageSettingsAdminList'
          description: ''
    post:
      operationId: api_admin_models_filestoragesettings_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
  /api/admin/models/filestoragesettings/{id}/:
    get:
      operationId: api_admin_models_filestoragesettings_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this File Storage Settings.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
    put:
      operationId: api_admin_models_filestoragesettings_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this File Storage Settings.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
    patch:
      operationId: api_admin_models_filestoragesettings_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this File Storage Settings.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedFileStorageSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedFileStorageSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedFileStorageSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
    delete:
      operationId: api_admin_models_filestoragesettings_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this File Storage Settings.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/filestoragesettings/bulk_action/:
    post:
      operationId: api_admin_models_filestoragesettings_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
  /api/admin/models/filestoragesettings/config/:
    get:
      operationId: api_admin_models_filestoragesettings_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
  /api/admin/models/filestoragesettings/export/:
    get:
      operationId: api_admin_models_filestoragesettings_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
  /api/admin/models/filestoragesettings/import/:
    post:
      operationId: api_admin_models_filestoragesettings_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/FileStorageSettingsAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FileStorageSettingsAdmin'
          description: ''
  /api/admin/models/group/:
    get:
      operationId: api_admin_models_group_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedGroupAdminList'
          description: ''
    post:
      operationId: api_admin_models_group_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
  /api/admin/models/group/{id}/:
    get:
      operationId: api_admin_models_group_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this group.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
    put:
      operationId: api_admin_models_group_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this group.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
    patch:
      operationId: api_admin_models_group_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this group.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedGroupAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedGroupAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedGroupAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
    delete:
      operationId: api_admin_models_group_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this group.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/group/bulk_action/:
    post:
      operationId: api_admin_models_group_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
  /api/admin/models/group/config/:
    get:
      operationId: api_admin_models_group_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
  /api/admin/models/group/export/:
    get:
      operationId: api_admin_models_group_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
  /api/admin/models/group/import/:
    post:
      operationId: api_admin_models_group_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/GroupAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GroupAdmin'
          description: ''
  /api/admin/models/order/:
    get:
      operationId: api_admin_models_order_list
      parameters:
      - in: query
        name: created_at
        schema:
          type: string
          format: date-time
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      - in: query
        name: status
        schema:
          type: string
          enum:
          - cancelled
          - confirmed
          - delivered
          - pending
          - processing
          - shipped
        description: |-
          * `pending` - Pending
          * `processing` - Processing
          * `shipped` - Shipped
          * `delivered` - Delivered
          * `cancelled` - Cancelled
          * `confirmed` - Confirmed
      - in: query
        name: updated_at
        schema:
          type: string
          format: date-time
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedOrderAdminList'
          description: ''
    post:
      operationId: api_admin_models_order_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
  /api/admin/models/order/{id}/:
    get:
      operationId: api_admin_models_order_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Order.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
    put:
      operationId: api_admin_models_order_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Order.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
    patch:
      operationId: api_admin_models_order_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Order.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedOrderAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedOrderAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedOrderAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
    delete:
      operationId: api_admin_models_order_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Order.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/order/bulk_action/:
    post:
      operationId: api_admin_models_order_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
  /api/admin/models/order/config/:
    get:
      operationId: api_admin_models_order_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
  /api/admin/models/order/export/:
    get:
      operationId: api_admin_models_order_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
  /api/admin/models/order/import/:
    post:
      operationId: api_admin_models_order_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/OrderAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderAdmin'
          description: ''
  /api/admin/models/post/:
    get:
      operationId: api_admin_models_post_list
      parameters:
      - in: query
        name: categories
        schema:
          type: array
          items:
            type: integer
        explode: true
        style: form
      - in: query
        name: created_at
        schema:
          type: string
          format: date-time
      - in: query
        name: is_featured
        schema:
          type: boolean
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      - in: query
        name: status
        schema:
          type: string
          enum:
          - archived
          - draft
          - published
          - scheduled
        description: |-
          * `draft` - Draft
          * `published` - Published
          * `scheduled` - Scheduled
          * `archived` - Archived
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedPostAdminList'
          description: ''
    post:
      operationId: api_admin_models_post_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostAdmin'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
  /api/admin/models/post/{id}/:
    get:
      operationId: api_admin_models_post_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
    put:
      operationId: api_admin_models_post_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
    patch:
      operationId: api_admin_models_post_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedPostAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedPostAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedPostAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
    delete:
      operationId: api_admin_models_post_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/post/bulk_action/:
    post:
      operationId: api_admin_models_post_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
  /api/admin/models/post/config/:
    get:
      operationId: api_admin_models_post_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
  /api/admin/models/post/export/:
    get:
      operationId: api_admin_models_post_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
  /api/admin/models/post/import/:
    post:
      operationId: api_admin_models_post_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostAdmin'
          description: ''
  /api/admin/models/product/:
    get:
      operationId: api_admin_models_product_list
      parameters:
      - in: query
        name: available
        schema:
          type: boolean
      - in: query
        name: created_at
        schema:
          type: string
          format: date-time
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      - in: query
        name: updated_at
        schema:
          type: string
          format: date-time
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedProductAdminList'
          description: ''
    post:
      operationId: api_admin_models_product_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
  /api/admin/models/product/{id}/:
    get:
      operationId: api_admin_models_product_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Product.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
    put:
      operationId: api_admin_models_product_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Product.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
    patch:
      operationId: api_admin_models_product_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Product.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedProductAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedProductAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedProductAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
    delete:
      operationId: api_admin_models_product_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Product.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/product/bulk_action/:
    post:
      operationId: api_admin_models_product_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
  /api/admin/models/product/config/:
    get:
      operationId: api_admin_models_product_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
  /api/admin/models/product/export/:
    get:
      operationId: api_admin_models_product_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
  /api/admin/models/product/import/:
    post:
      operationId: api_admin_models_product_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductAdmin'
          description: ''
  /api/admin/models/productcategory/:
    get:
      operationId: api_admin_models_productcategory_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedProductCategoryAdminList'
          description: ''
    post:
      operationId: api_admin_models_productcategory_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
  /api/admin/models/productcategory/{id}/:
    get:
      operationId: api_admin_models_productcategory_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Product Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
    put:
      operationId: api_admin_models_productcategory_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Product Category.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
    patch:
      operationId: api_admin_models_productcategory_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Product Category.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedProductCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedProductCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedProductCategoryAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
    delete:
      operationId: api_admin_models_productcategory_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Product Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/productcategory/bulk_action/:
    post:
      operationId: api_admin_models_productcategory_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
  /api/admin/models/productcategory/config/:
    get:
      operationId: api_admin_models_productcategory_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
  /api/admin/models/productcategory/export/:
    get:
      operationId: api_admin_models_productcategory_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
  /api/admin/models/productcategory/import/:
    post:
      operationId: api_admin_models_productcategory_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ProductCategoryAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductCategoryAdmin'
          description: ''
  /api/admin/models/requestlog/:
    get:
      operationId: api_admin_models_requestlog_list
      parameters:
      - in: query
        name: method
        schema:
          type: string
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      - in: query
        name: status_code
        schema:
          type: integer
      - in: query
        name: timestamp
        schema:
          type: string
          format: date-time
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedRequestLogAdminList'
          description: ''
    post:
      operationId: api_admin_models_requestlog_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
  /api/admin/models/requestlog/{id}/:
    get:
      operationId: api_admin_models_requestlog_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Request Log.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
    put:
      operationId: api_admin_models_requestlog_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Request Log.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
    patch:
      operationId: api_admin_models_requestlog_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Request Log.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedRequestLogAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedRequestLogAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedRequestLogAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
    delete:
      operationId: api_admin_models_requestlog_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Request Log.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/requestlog/bulk_action/:
    post:
      operationId: api_admin_models_requestlog_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
  /api/admin/models/requestlog/config/:
    get:
      operationId: api_admin_models_requestlog_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
  /api/admin/models/requestlog/export/:
    get:
      operationId: api_admin_models_requestlog_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
  /api/admin/models/requestlog/import/:
    post:
      operationId: api_admin_models_requestlog_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/RequestLogAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestLogAdmin'
          description: ''
  /api/admin/models/siteidentity/:
    get:
      operationId: api_admin_models_siteidentity_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedSiteIdentityAdminList'
          description: ''
    post:
      operationId: api_admin_models_siteidentity_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
  /api/admin/models/siteidentity/{id}/:
    get:
      operationId: api_admin_models_siteidentity_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Site Identity & SEO.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
    put:
      operationId: api_admin_models_siteidentity_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Site Identity & SEO.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
    patch:
      operationId: api_admin_models_siteidentity_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Site Identity & SEO.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedSiteIdentityAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedSiteIdentityAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedSiteIdentityAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
    delete:
      operationId: api_admin_models_siteidentity_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Site Identity & SEO.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/siteidentity/bulk_action/:
    post:
      operationId: api_admin_models_siteidentity_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
  /api/admin/models/siteidentity/config/:
    get:
      operationId: api_admin_models_siteidentity_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
  /api/admin/models/siteidentity/export/:
    get:
      operationId: api_admin_models_siteidentity_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
  /api/admin/models/siteidentity/import/:
    post:
      operationId: api_admin_models_siteidentity_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/SiteIdentityAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SiteIdentityAdmin'
          description: ''
  /api/admin/models/tag/:
    get:
      operationId: api_admin_models_tag_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedTagAdminList'
          description: ''
    post:
      operationId: api_admin_models_tag_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TagAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
  /api/admin/models/tag/{id}/:
    get:
      operationId: api_admin_models_tag_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
    put:
      operationId: api_admin_models_tag_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TagAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
    patch:
      operationId: api_admin_models_tag_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedTagAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedTagAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedTagAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
    delete:
      operationId: api_admin_models_tag_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/tag/bulk_action/:
    post:
      operationId: api_admin_models_tag_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TagAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
  /api/admin/models/tag/config/:
    get:
      operationId: api_admin_models_tag_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
  /api/admin/models/tag/export/:
    get:
      operationId: api_admin_models_tag_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
  /api/admin/models/tag/import/:
    post:
      operationId: api_admin_models_tag_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TagAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TagAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagAdmin'
          description: ''
  /api/admin/models/totpdevice/:
    get:
      operationId: api_admin_models_totpdevice_list
      parameters:
      - in: query
        name: confirmed
        schema:
          type: boolean
      - in: query
        name: created_at
        schema:
          type: string
          format: date-time
      - in: query
        name: last_used_at
        schema:
          type: string
          format: date-time
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedTOTPDeviceAdminList'
          description: ''
    post:
      operationId: api_admin_models_totpdevice_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
  /api/admin/models/totpdevice/{id}/:
    get:
      operationId: api_admin_models_totpdevice_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this TOTP device.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
    put:
      operationId: api_admin_models_totpdevice_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this TOTP device.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
    patch:
      operationId: api_admin_models_totpdevice_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this TOTP device.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedTOTPDeviceAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedTOTPDeviceAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedTOTPDeviceAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
    delete:
      operationId: api_admin_models_totpdevice_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this TOTP device.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/totpdevice/bulk_action/:
    post:
      operationId: api_admin_models_totpdevice_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
  /api/admin/models/totpdevice/config/:
    get:
      operationId: api_admin_models_totpdevice_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
  /api/admin/models/totpdevice/export/:
    get:
      operationId: api_admin_models_totpdevice_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
  /api/admin/models/totpdevice/import/:
    post:
      operationId: api_admin_models_totpdevice_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TOTPDeviceAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TOTPDeviceAdmin'
          description: ''
  /api/admin/models/user/:
    get:
      operationId: api_admin_models_user_list
      parameters:
      - in: query
        name: groups
        schema:
          type: array
          items:
            type: integer
        explode: true
        style: form
      - in: query
        name: is_active
        schema:
          type: boolean
      - in: query
        name: is_staff
        schema:
          type: boolean
      - in: query
        name: is_superuser
        schema:
          type: boolean
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedUserAdminList'
          description: ''
    post:
      operationId: api_admin_models_user_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UserAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
  /api/admin/models/user/{id}/:
    get:
      operationId: api_admin_models_user_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
    put:
      operationId: api_admin_models_user_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UserAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
    patch:
      operationId: api_admin_models_user_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedUserAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedUserAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedUserAdmin'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
    delete:
      operationId: api_admin_models_user_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/admin/models/user/bulk_action/:
    post:
      operationId: api_admin_models_user_bulk_action_create
      description: Handle bulk actions
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UserAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
  /api/admin/models/user/config/:
    get:
      operationId: api_admin_models_user_config_retrieve
      description: Return admin configuration for frontend
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
  /api/admin/models/user/export/:
    get:
      operationId: api_admin_models_user_export_retrieve
      description: Export data in various formats
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
  /api/admin/models/user/import/:
    post:
      operationId: api_admin_models_user_import_create
      description: |-
        Bulk import objects from a JSON or CSV file.
        The file should be sent as multipart/form-data with the key 'file'.
        The file format is determined by the file extension (.json or .csv).
        An optional 'format' field can be used as a fallback.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/UserAdmin'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UserAdmin'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAdmin'
          description: ''
  /api/admin/user/:
    get:
      operationId: api_admin_user_retrieve
      description: Return current user information and permissions
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          description: No response body
  /api/auth/2fa/disable/:
    post:
      operationId: api_auth_2fa_disable_create
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          description: No response body
  /api/auth/2fa/enable/:
    get:
      operationId: api_auth_2fa_enable_retrieve
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          description: No response body
  /api/auth/2fa/verify/:
    post:
      operationId: api_auth_2fa_verify_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TwoFactorVerify'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TwoFactorVerify'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TwoFactorVerify'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TwoFactorVerify'
          description: ''
  /api/auth/me/:
    get:
      operationId: api_auth_me_retrieve
      description: Manage the current user's profile data.
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
          description: ''
    put:
      operationId: api_auth_me_update
      description: Manage the current user's profile data.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfile'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/UserProfile'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UserProfile'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
          description: ''
    patch:
      operationId: api_auth_me_partial_update
      description: Manage the current user's profile data.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedUserProfile'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedUserProfile'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedUserProfile'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
          description: ''
  /api/auth/me/change-password/:
    post:
      operationId: api_auth_me_change_password_create
      description: Change password for the current user.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChangePassword'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ChangePassword'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/ChangePassword'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChangePassword'
          description: ''
  /api/auth/password_reset/:
    post:
      operationId: api_auth_password_reset_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PasswordResetRequest'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PasswordResetRequest'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PasswordResetRequest'
        required: true
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PasswordResetRequest'
          description: ''
  /api/auth/password_reset/confirm/:
    post:
      operationId: api_auth_password_reset_confirm_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PasswordResetConfirm'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PasswordResetConfirm'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PasswordResetConfirm'
        required: true
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PasswordResetConfirm'
          description: ''
  /api/auth/token/verify/:
    post:
      operationId: api_auth_token_verify_create
      description: Takes username, password, and OTP to verify and return tokens.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenVerify'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenVerify'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenVerify'
        required: true
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TwoFactorTokenVerify'
          description: ''
  /api/blog/authors/:
    get:
      operationId: api_blog_authors_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedAuthorList'
          description: ''
  /api/blog/authors/{id}/:
    get:
      operationId: api_blog_authors_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Author'
          description: ''
  /api/blog/authors/{id}/posts/:
    get:
      operationId: api_blog_authors_posts_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this user.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Author'
          description: ''
  /api/blog/categories/:
    get:
      operationId: api_blog_categories_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedCategoryList'
          description: ''
  /api/blog/categories/{id}/:
    get:
      operationId: api_blog_categories_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Category'
          description: ''
  /api/blog/categories/{id}/posts/:
    get:
      operationId: api_blog_categories_posts_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Category.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Category'
          description: ''
  /api/blog/comments/:
    get:
      operationId: api_blog_comments_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedCommentList'
          description: ''
    post:
      operationId: api_blog_comments_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentCreate'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentCreate'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentCreate'
        required: true
      security:
      - jwtAuth: []
      - {}
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentCreate'
          description: ''
  /api/blog/comments/{id}/:
    get:
      operationId: api_blog_comments_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Comment'
          description: ''
    put:
      operationId: api_blog_comments_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Comment'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/Comment'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/Comment'
        required: true
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Comment'
          description: ''
    patch:
      operationId: api_blog_comments_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedComment'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedComment'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedComment'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Comment'
          description: ''
    delete:
      operationId: api_blog_comments_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Comment.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/blog/feed/:
    get:
      operationId: api_blog_feed_list
      description: An RSS-like feed of the most recent posts.
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedPostListList'
          description: ''
  /api/blog/posts/:
    get:
      operationId: api_blog_posts_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: page_size
        required: false
        in: query
        description: Number of results to return per page.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedPostListList'
          description: ''
    post:
      operationId: api_blog_posts_create
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostList'
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
  /api/blog/posts/{id}/:
    get:
      operationId: api_blog_posts_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostDetail'
          description: ''
    put:
      operationId: api_blog_posts_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostList'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
    patch:
      operationId: api_blog_posts_partial_update
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchedPostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PatchedPostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PatchedPostList'
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
    delete:
      operationId: api_blog_posts_destroy
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '204':
          description: No response body
  /api/blog/posts/{id}/increment_view/:
    post:
      operationId: api_blog_posts_increment_view_create
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostList'
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
  /api/blog/posts/{id}/like/:
    post:
      operationId: api_blog_posts_like_create
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostList'
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
  /api/blog/posts/{id}/unlike/:
    post:
      operationId: api_blog_posts_unlike_create
      parameters:
      - in: path
        name: id
        schema:
          type: string
          format: uuid
        description: A UUID string identifying this Post.
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostList'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PostList'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/PostList'
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PostList'
          description: ''
  /api/blog/posts/{post_pk}/comments/:
    get:
      operationId: api_blog_posts_comments_list
      description: View to list and create comments for a specific post.
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: page_size
        required: false
        in: query
        description: Number of results to return per page.
        schema:
          type: integer
      - in: path
        name: post_pk
        schema:
          type: string
          format: uuid
        required: true
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedCommentList'
          description: ''
    post:
      operationId: api_blog_posts_comments_create
      description: View to list and create comments for a specific post.
      parameters:
      - in: path
        name: post_pk
        schema:
          type: string
          format: uuid
        required: true
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentCreate'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/CommentCreate'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/CommentCreate'
        required: true
      security:
      - jwtAuth: []
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CommentCreate'
          description: ''
  /api/blog/search/:
    get:
      operationId: api_blog_search_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: page_size
        required: false
        in: query
        description: Number of results to return per page.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedPostListList'
          description: ''
  /api/blog/stats/:
    get:
      operationId: api_blog_stats_retrieve
      description: Provides statistics about the blog.
      tags:
      - api
      security:
      - jwtAuth: []
      - {}
      responses:
        '200':
          description: No response body
  /api/blog/tags/:
    get:
      operationId: api_blog_tags_list
      parameters:
      - name: ordering
        required: false
        in: query
        description: Which field to use when ordering the results.
        schema:
          type: string
      - name: page
        required: false
        in: query
        description: A page number within the paginated result set.
        schema:
          type: integer
      - name: search
        required: false
        in: query
        description: A search term.
        schema:
          type: string
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedTagList'
          description: ''
  /api/blog/tags/{id}/:
    get:
      operationId: api_blog_tags_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tag'
          description: ''
  /api/blog/tags/{id}/posts/:
    get:
      operationId: api_blog_tags_posts_retrieve
      parameters:
      - in: path
        name: id
        schema:
          type: integer
        description: A unique integer value identifying this Tag.
        required: true
      tags:
      - api
      security:
      - jwtAuth: []
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tag'
          description: ''
  /api/token/:
    post:
      operationId: api_token_create
      description: A custom token obtain pair view that handles 2FA.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenObtainPair'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenObtainPair'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TwoFactorTokenObtainPair'
        required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TwoFactorTokenObtainPair'
          description: ''
  /api/token/refresh/:
    post:
      operationId: api_token_refresh_create
      description: |-
        Takes a refresh type JSON web token and returns an access type JSON web
        token if the refresh token is valid.
      tags:
      - api
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TokenRefresh'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TokenRefresh'
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/TokenRefresh'
        required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenRefresh'
          description: ''
components:
  schemas:
    AdminPreferencesAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        theme_display:
          type: string
          readOnly: true
        theme_en_display:
          type: string
          readOnly: true
        theme_de_display:
          type: string
          readOnly: true
        theme_fr_display:
          type: string
          readOnly: true
        density_display:
          type: string
          readOnly: true
        density_en_display:
          type: string
          readOnly: true
        density_de_display:
          type: string
          readOnly: true
        density_fr_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        theme:
          $ref: '#/components/schemas/ThemeEnum'
        theme_en:
          nullable: true
          title: Theme [en]
          oneOf:
          - $ref: '#/components/schemas/ThemeEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        theme_de:
          nullable: true
          title: Theme [de]
          oneOf:
          - $ref: '#/components/schemas/ThemeDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        theme_fr:
          nullable: true
          title: Theme [fr]
          oneOf:
          - $ref: '#/components/schemas/ThemeFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density:
          $ref: '#/components/schemas/DensityEnum'
        density_en:
          nullable: true
          title: Density [en]
          oneOf:
          - $ref: '#/components/schemas/DensityEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density_de:
          nullable: true
          title: Density [de]
          oneOf:
          - $ref: '#/components/schemas/DensityDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density_fr:
          nullable: true
          title: Density [fr]
          oneOf:
          - $ref: '#/components/schemas/DensityFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        notifications_enabled:
          type: boolean
        user:
          type: integer
      required:
      - density_de_display
      - density_display
      - density_en_display
      - density_fr_display
      - id
      - theme_de_display
      - theme_display
      - theme_en_display
      - theme_fr_display
      - user
      - user_str
    Author:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        username:
          type: string
          description: Required. 150 characters or fewer. Letters, digits and @/./+/-/_
            only.
          pattern: ^[\w.@+-]+$
          maxLength: 150
        first_name:
          type: string
          maxLength: 150
        last_name:
          type: string
          maxLength: 150
        email:
          type: string
          format: email
          title: Email address
          maxLength: 254
        post_count:
          type: string
          readOnly: true
      required:
      - id
      - post_count
      - username
    BlankEnum:
      enum:
      - ''
    Category:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 100
        slug:
          type: string
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        description:
          type: string
        parent:
          type: integer
          nullable: true
        is_active:
          type: boolean
        post_count:
          type: integer
          readOnly: true
        meta_title:
          type: string
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        subcategories:
          type: string
          readOnly: true
      required:
      - id
      - name
      - post_count
      - subcategories
    CategoryAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        parent_str:
          type: string
          readOnly: true
        name:
          type: string
          maxLength: 100
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 100
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 100
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 100
        slug:
          type: string
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        description:
          type: string
        description_en:
          type: string
          nullable: true
          title: Description [en]
        description_de:
          type: string
          nullable: true
          title: Description [de]
        description_fr:
          type: string
          nullable: true
          title: Description [fr]
        is_active:
          type: boolean
        post_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        meta_title:
          type: string
          maxLength: 200
        meta_title_en:
          type: string
          nullable: true
          title: Meta title [en]
          maxLength: 200
        meta_title_de:
          type: string
          nullable: true
          title: Meta title [de]
          maxLength: 200
        meta_title_fr:
          type: string
          nullable: true
          title: Meta title [fr]
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        meta_description_en:
          type: string
          nullable: true
          title: Meta description [en]
          maxLength: 300
        meta_description_de:
          type: string
          nullable: true
          title: Meta description [de]
          maxLength: 300
        meta_description_fr:
          type: string
          nullable: true
          title: Meta description [fr]
          maxLength: 300
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        parent:
          type: integer
          nullable: true
      required:
      - created_at
      - id
      - name
      - parent_str
      - updated_at
    ChangePassword:
      type: object
      properties:
        old_password:
          type: string
          writeOnly: true
        new_password:
          type: string
          writeOnly: true
          minLength: 8
      required:
      - new_password
      - old_password
    Comment:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        post:
          type: string
          format: uuid
        author_display_name:
          type: string
          readOnly: true
        author_website:
          type: string
          format: uri
          maxLength: 200
        user:
          type: integer
          readOnly: true
          nullable: true
        parent:
          type: string
          format: uuid
          nullable: true
          title: Parent Comment
        content:
          type: string
        created_at:
          type: string
          format: date-time
          readOnly: true
        replies:
          type: string
          readOnly: true
      required:
      - author_display_name
      - content
      - created_at
      - id
      - post
      - replies
      - user
    CommentAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        post_str:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        parent_str:
          type: string
          readOnly: true
        author_name:
          type: string
          maxLength: 100
        author_name_en:
          type: string
          nullable: true
          title: Author Name [en]
          maxLength: 100
        author_name_de:
          type: string
          nullable: true
          title: Author Name [de]
          maxLength: 100
        author_name_fr:
          type: string
          nullable: true
          title: Author Name [fr]
          maxLength: 100
        author_email:
          type: string
          format: email
          maxLength: 254
        author_email_en:
          type: string
          format: email
          nullable: true
          title: Author Email [en]
          maxLength: 254
        author_email_de:
          type: string
          format: email
          nullable: true
          title: Author Email [de]
          maxLength: 254
        author_email_fr:
          type: string
          format: email
          nullable: true
          title: Author Email [fr]
          maxLength: 254
        author_website:
          type: string
          format: uri
          maxLength: 200
        author_website_en:
          type: string
          format: uri
          nullable: true
          title: Author Website [en]
          maxLength: 200
        author_website_de:
          type: string
          format: uri
          nullable: true
          title: Author Website [de]
          maxLength: 200
        author_website_fr:
          type: string
          format: uri
          nullable: true
          title: Author Website [fr]
          maxLength: 200
        content:
          type: string
        content_en:
          type: string
          nullable: true
          title: Content [en]
        content_de:
          type: string
          nullable: true
          title: Content [de]
        content_fr:
          type: string
          nullable: true
          title: Content [fr]
        is_approved:
          type: boolean
        ip_address:
          type: string
          nullable: true
        user_agent:
          type: string
        user_agent_en:
          type: string
          nullable: true
          title: User Agent [en]
        user_agent_de:
          type: string
          nullable: true
          title: User Agent [de]
        user_agent_fr:
          type: string
          nullable: true
          title: User Agent [fr]
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        post:
          type: string
          format: uuid
        user:
          type: integer
          nullable: true
        parent:
          type: string
          format: uuid
          nullable: true
          title: Parent Comment
      required:
      - author_email
      - author_name
      - content
      - created_at
      - id
      - parent_str
      - post
      - post_str
      - updated_at
      - user_str
    CommentCreate:
      type: object
      properties:
        content:
          type: string
        author_name:
          type: string
          maxLength: 100
        author_email:
          type: string
          format: email
          maxLength: 254
        author_website:
          type: string
          format: uri
          maxLength: 200
        parent:
          type: string
          format: uuid
          nullable: true
          title: Parent Comment
      required:
      - author_email
      - author_name
      - content
    DensityDeEnum:
      enum:
      - compact
      - comfortable
      type: string
      description: |-
        * `compact` - Compact
        * `comfortable` - Comfortable
    DensityEnEnum:
      enum:
      - compact
      - comfortable
      type: string
      description: |-
        * `compact` - Compact
        * `comfortable` - Comfortable
    DensityEnum:
      enum:
      - compact
      - comfortable
      type: string
      description: |-
        * `compact` - Compact
        * `comfortable` - Comfortable
    DensityFrEnum:
      enum:
      - compact
      - comfortable
      type: string
      description: |-
        * `compact` - Compact
        * `comfortable` - Comfortable
    DigitsEnum:
      enum:
      - 6
      - 8
      type: integer
      description: |-
        * `6` - 6
        * `8` - 8
    EmailSettingsAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        backend:
          type: string
          description: The email backend to use. E.g., 'django.core.mail.backends.smtp.EmailBackend'.
          maxLength: 255
        host:
          type: string
          description: The email server host.
          maxLength: 255
        port:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: The port for the email server.
        use_tls:
          type: boolean
          description: Whether to use a TLS secure connection.
        host_user:
          type: string
          description: Username for the email server.
          maxLength: 255
        host_password:
          type: string
          description: Password for the email server.
          maxLength: 255
        default_from_email:
          type: string
          format: email
          description: Default 'from' address for emails.
          maxLength: 254
      required:
      - id
    FileStorageSettingsAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        default_storage_backend:
          type: string
          description: Default file storage backend. E.g., 'storages.backends.s3boto3.S3Boto3Storage'.
          maxLength: 255
        static_storage_backend:
          type: string
          description: Static files storage backend. E.g., 'storages.backends.s3boto3.S3Boto3Storage'.
          maxLength: 255
        aws_access_key_id:
          type: string
          maxLength: 255
        aws_secret_access_key:
          type: string
          maxLength: 255
        aws_storage_bucket_name:
          type: string
          maxLength: 255
        aws_s3_region_name:
          type: string
          description: e.g. 'us-east-1'
          maxLength: 255
        aws_s3_custom_domain:
          type: string
          description: e.g. 'cdn.example.com'
          maxLength: 255
      required:
      - id
    GroupAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 150
        permissions:
          type: array
          items:
            type: integer
      required:
      - id
      - name
    NullEnum:
      enum:
      - null
    OrderAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        status_display:
          type: string
          readOnly: true
        status_en_display:
          type: string
          readOnly: true
        status_de_display:
          type: string
          readOnly: true
        status_fr_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        first_name:
          type: string
          maxLength: 50
        first_name_en:
          type: string
          nullable: true
          title: First name [en]
          maxLength: 50
        first_name_de:
          type: string
          nullable: true
          title: First name [de]
          maxLength: 50
        first_name_fr:
          type: string
          nullable: true
          title: First name [fr]
          maxLength: 50
        last_name:
          type: string
          maxLength: 50
        last_name_en:
          type: string
          nullable: true
          title: Last name [en]
          maxLength: 50
        last_name_de:
          type: string
          nullable: true
          title: Last name [de]
          maxLength: 50
        last_name_fr:
          type: string
          nullable: true
          title: Last name [fr]
          maxLength: 50
        email:
          type: string
          format: email
          maxLength: 254
        email_en:
          type: string
          format: email
          nullable: true
          title: Email [en]
          maxLength: 254
        email_de:
          type: string
          format: email
          nullable: true
          title: Email [de]
          maxLength: 254
        email_fr:
          type: string
          format: email
          nullable: true
          title: Email [fr]
          maxLength: 254
        address:
          type: string
          maxLength: 250
        address_en:
          type: string
          nullable: true
          title: Address [en]
          maxLength: 250
        address_de:
          type: string
          nullable: true
          title: Address [de]
          maxLength: 250
        address_fr:
          type: string
          nullable: true
          title: Address [fr]
          maxLength: 250
        postal_code:
          type: string
          maxLength: 20
        postal_code_en:
          type: string
          nullable: true
          title: Postal code [en]
          maxLength: 20
        postal_code_de:
          type: string
          nullable: true
          title: Postal code [de]
          maxLength: 20
        postal_code_fr:
          type: string
          nullable: true
          title: Postal code [fr]
          maxLength: 20
        city:
          type: string
          maxLength: 100
        city_en:
          type: string
          nullable: true
          title: City [en]
          maxLength: 100
        city_de:
          type: string
          nullable: true
          title: City [de]
          maxLength: 100
        city_fr:
          type: string
          nullable: true
          title: City [fr]
          maxLength: 100
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        status:
          $ref: '#/components/schemas/Status40cEnum'
        status_en:
          nullable: true
          title: Status [en]
          oneOf:
          - $ref: '#/components/schemas/StatusEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        status_de:
          nullable: true
          title: Status [de]
          oneOf:
          - $ref: '#/components/schemas/StatusDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        status_fr:
          nullable: true
          title: Status [fr]
          oneOf:
          - $ref: '#/components/schemas/StatusFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        user:
          type: integer
          nullable: true
      required:
      - address
      - city
      - created_at
      - email
      - first_name
      - id
      - last_name
      - postal_code
      - status_de_display
      - status_display
      - status_en_display
      - status_fr_display
      - updated_at
      - user_str
    PaginatedAdminPreferencesAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/AdminPreferencesAdmin'
    PaginatedAuthorList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/Author'
    PaginatedCategoryAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/CategoryAdmin'
    PaginatedCategoryList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/Category'
    PaginatedCommentAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/CommentAdmin'
    PaginatedCommentList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/Comment'
    PaginatedEmailSettingsAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/EmailSettingsAdmin'
    PaginatedFileStorageSettingsAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/FileStorageSettingsAdmin'
    PaginatedGroupAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/GroupAdmin'
    PaginatedOrderAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/OrderAdmin'
    PaginatedPostAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/PostAdmin'
    PaginatedPostListList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/PostList'
    PaginatedProductAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/ProductAdmin'
    PaginatedProductCategoryAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/ProductCategoryAdmin'
    PaginatedRequestLogAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/RequestLogAdmin'
    PaginatedSiteIdentityAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/SiteIdentityAdmin'
    PaginatedTOTPDeviceAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/TOTPDeviceAdmin'
    PaginatedTagAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/TagAdmin'
    PaginatedTagList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/Tag'
    PaginatedUserAdminList:
      type: object
      required:
      - count
      - results
      properties:
        count:
          type: integer
          example: 123
        next:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=4
        previous:
          type: string
          nullable: true
          format: uri
          example: http://api.example.org/accounts/?page=2
        results:
          type: array
          items:
            $ref: '#/components/schemas/UserAdmin'
    PasswordResetConfirm:
      type: object
      properties:
        token:
          type: string
        password:
          type: string
          writeOnly: true
          minLength: 8
      required:
      - password
      - token
    PasswordResetRequest:
      type: object
      properties:
        email:
          type: string
          format: email
      required:
      - email
    PatchedAdminPreferencesAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        theme_display:
          type: string
          readOnly: true
        theme_en_display:
          type: string
          readOnly: true
        theme_de_display:
          type: string
          readOnly: true
        theme_fr_display:
          type: string
          readOnly: true
        density_display:
          type: string
          readOnly: true
        density_en_display:
          type: string
          readOnly: true
        density_de_display:
          type: string
          readOnly: true
        density_fr_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        theme:
          $ref: '#/components/schemas/ThemeEnum'
        theme_en:
          nullable: true
          title: Theme [en]
          oneOf:
          - $ref: '#/components/schemas/ThemeEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        theme_de:
          nullable: true
          title: Theme [de]
          oneOf:
          - $ref: '#/components/schemas/ThemeDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        theme_fr:
          nullable: true
          title: Theme [fr]
          oneOf:
          - $ref: '#/components/schemas/ThemeFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density:
          $ref: '#/components/schemas/DensityEnum'
        density_en:
          nullable: true
          title: Density [en]
          oneOf:
          - $ref: '#/components/schemas/DensityEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density_de:
          nullable: true
          title: Density [de]
          oneOf:
          - $ref: '#/components/schemas/DensityDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        density_fr:
          nullable: true
          title: Density [fr]
          oneOf:
          - $ref: '#/components/schemas/DensityFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        notifications_enabled:
          type: boolean
        user:
          type: integer
    PatchedCategoryAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        parent_str:
          type: string
          readOnly: true
        name:
          type: string
          maxLength: 100
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 100
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 100
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 100
        slug:
          type: string
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 120
          pattern: ^[-a-zA-Z0-9_]+$
        description:
          type: string
        description_en:
          type: string
          nullable: true
          title: Description [en]
        description_de:
          type: string
          nullable: true
          title: Description [de]
        description_fr:
          type: string
          nullable: true
          title: Description [fr]
        is_active:
          type: boolean
        post_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        meta_title:
          type: string
          maxLength: 200
        meta_title_en:
          type: string
          nullable: true
          title: Meta title [en]
          maxLength: 200
        meta_title_de:
          type: string
          nullable: true
          title: Meta title [de]
          maxLength: 200
        meta_title_fr:
          type: string
          nullable: true
          title: Meta title [fr]
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        meta_description_en:
          type: string
          nullable: true
          title: Meta description [en]
          maxLength: 300
        meta_description_de:
          type: string
          nullable: true
          title: Meta description [de]
          maxLength: 300
        meta_description_fr:
          type: string
          nullable: true
          title: Meta description [fr]
          maxLength: 300
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        parent:
          type: integer
          nullable: true
    PatchedComment:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        post:
          type: string
          format: uuid
        author_display_name:
          type: string
          readOnly: true
        author_website:
          type: string
          format: uri
          maxLength: 200
        user:
          type: integer
          readOnly: true
          nullable: true
        parent:
          type: string
          format: uuid
          nullable: true
          title: Parent Comment
        content:
          type: string
        created_at:
          type: string
          format: date-time
          readOnly: true
        replies:
          type: string
          readOnly: true
    PatchedCommentAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        post_str:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        parent_str:
          type: string
          readOnly: true
        author_name:
          type: string
          maxLength: 100
        author_name_en:
          type: string
          nullable: true
          title: Author Name [en]
          maxLength: 100
        author_name_de:
          type: string
          nullable: true
          title: Author Name [de]
          maxLength: 100
        author_name_fr:
          type: string
          nullable: true
          title: Author Name [fr]
          maxLength: 100
        author_email:
          type: string
          format: email
          maxLength: 254
        author_email_en:
          type: string
          format: email
          nullable: true
          title: Author Email [en]
          maxLength: 254
        author_email_de:
          type: string
          format: email
          nullable: true
          title: Author Email [de]
          maxLength: 254
        author_email_fr:
          type: string
          format: email
          nullable: true
          title: Author Email [fr]
          maxLength: 254
        author_website:
          type: string
          format: uri
          maxLength: 200
        author_website_en:
          type: string
          format: uri
          nullable: true
          title: Author Website [en]
          maxLength: 200
        author_website_de:
          type: string
          format: uri
          nullable: true
          title: Author Website [de]
          maxLength: 200
        author_website_fr:
          type: string
          format: uri
          nullable: true
          title: Author Website [fr]
          maxLength: 200
        content:
          type: string
        content_en:
          type: string
          nullable: true
          title: Content [en]
        content_de:
          type: string
          nullable: true
          title: Content [de]
        content_fr:
          type: string
          nullable: true
          title: Content [fr]
        is_approved:
          type: boolean
        ip_address:
          type: string
          nullable: true
        user_agent:
          type: string
        user_agent_en:
          type: string
          nullable: true
          title: User Agent [en]
        user_agent_de:
          type: string
          nullable: true
          title: User Agent [de]
        user_agent_fr:
          type: string
          nullable: true
          title: User Agent [fr]
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        post:
          type: string
          format: uuid
        user:
          type: integer
          nullable: true
        parent:
          type: string
          format: uuid
          nullable: true
          title: Parent Comment
    PatchedEmailSettingsAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        backend:
          type: string
          description: The email backend to use. E.g., 'django.core.mail.backends.smtp.EmailBackend'.
          maxLength: 255
        host:
          type: string
          description: The email server host.
          maxLength: 255
        port:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: The port for the email server.
        use_tls:
          type: boolean
          description: Whether to use a TLS secure connection.
        host_user:
          type: string
          description: Username for the email server.
          maxLength: 255
        host_password:
          type: string
          description: Password for the email server.
          maxLength: 255
        default_from_email:
          type: string
          format: email
          description: Default 'from' address for emails.
          maxLength: 254
    PatchedFileStorageSettingsAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        default_storage_backend:
          type: string
          description: Default file storage backend. E.g., 'storages.backends.s3boto3.S3Boto3Storage'.
          maxLength: 255
        static_storage_backend:
          type: string
          description: Static files storage backend. E.g., 'storages.backends.s3boto3.S3Boto3Storage'.
          maxLength: 255
        aws_access_key_id:
          type: string
          maxLength: 255
        aws_secret_access_key:
          type: string
          maxLength: 255
        aws_storage_bucket_name:
          type: string
          maxLength: 255
        aws_s3_region_name:
          type: string
          description: e.g. 'us-east-1'
          maxLength: 255
        aws_s3_custom_domain:
          type: string
          description: e.g. 'cdn.example.com'
          maxLength: 255
    PatchedGroupAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 150
        permissions:
          type: array
          items:
            type: integer
    PatchedOrderAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        status_display:
          type: string
          readOnly: true
        status_en_display:
          type: string
          readOnly: true
        status_de_display:
          type: string
          readOnly: true
        status_fr_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        first_name:
          type: string
          maxLength: 50
        first_name_en:
          type: string
          nullable: true
          title: First name [en]
          maxLength: 50
        first_name_de:
          type: string
          nullable: true
          title: First name [de]
          maxLength: 50
        first_name_fr:
          type: string
          nullable: true
          title: First name [fr]
          maxLength: 50
        last_name:
          type: string
          maxLength: 50
        last_name_en:
          type: string
          nullable: true
          title: Last name [en]
          maxLength: 50
        last_name_de:
          type: string
          nullable: true
          title: Last name [de]
          maxLength: 50
        last_name_fr:
          type: string
          nullable: true
          title: Last name [fr]
          maxLength: 50
        email:
          type: string
          format: email
          maxLength: 254
        email_en:
          type: string
          format: email
          nullable: true
          title: Email [en]
          maxLength: 254
        email_de:
          type: string
          format: email
          nullable: true
          title: Email [de]
          maxLength: 254
        email_fr:
          type: string
          format: email
          nullable: true
          title: Email [fr]
          maxLength: 254
        address:
          type: string
          maxLength: 250
        address_en:
          type: string
          nullable: true
          title: Address [en]
          maxLength: 250
        address_de:
          type: string
          nullable: true
          title: Address [de]
          maxLength: 250
        address_fr:
          type: string
          nullable: true
          title: Address [fr]
          maxLength: 250
        postal_code:
          type: string
          maxLength: 20
        postal_code_en:
          type: string
          nullable: true
          title: Postal code [en]
          maxLength: 20
        postal_code_de:
          type: string
          nullable: true
          title: Postal code [de]
          maxLength: 20
        postal_code_fr:
          type: string
          nullable: true
          title: Postal code [fr]
          maxLength: 20
        city:
          type: string
          maxLength: 100
        city_en:
          type: string
          nullable: true
          title: City [en]
          maxLength: 100
        city_de:
          type: string
          nullable: true
          title: City [de]
          maxLength: 100
        city_fr:
          type: string
          nullable: true
          title: City [fr]
          maxLength: 100
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        status:
          $ref: '#/components/schemas/Status40cEnum'
        status_en:
          nullable: true
          title: Status [en]
          oneOf:
          - $ref: '#/components/schemas/StatusEnEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        status_de:
          nullable: true
          title: Status [de]
          oneOf:
          - $ref: '#/components/schemas/StatusDeEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        status_fr:
          nullable: true
          title: Status [fr]
          oneOf:
          - $ref: '#/components/schemas/StatusFrEnum'
          - $ref: '#/components/schemas/BlankEnum'
          - $ref: '#/components/schemas/NullEnum'
        user:
          type: integer
          nullable: true
    PatchedPostAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        status_display:
          type: string
          readOnly: true
        author_str:
          type: string
          readOnly: true
        title:
          type: string
          nullable: true
          maxLength: 200
        title_en:
          type: string
          nullable: true
          title: Title [en]
          maxLength: 200
        title_de:
          type: string
          nullable: true
          title: Title [de]
          maxLength: 200
        title_fr:
          type: string
          nullable: true
          title: Title [fr]
          maxLength: 200
        slug:
          type: string
          nullable: true
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        content:
          type: string
          nullable: true
        content_en:
          type: string
          nullable: true
          title: Content [en]
        content_de:
          type: string
          nullable: true
          title: Content [de]
        content_fr:
          type: string
          nullable: true
          title: Content [fr]
        excerpt:
          type: string
        excerpt_en:
          type: string
          nullable: true
          title: Excerpt [en]
        excerpt_de:
          type: string
          nullable: true
          title: Excerpt [de]
        excerpt_fr:
          type: string
          nullable: true
          title: Excerpt [fr]
        featured_image:
          type: string
          format: uri
          nullable: true
        status:
          $ref: '#/components/schemas/PostAdminStatusEnum'
        is_featured:
          type: boolean
        is_sticky:
          type: boolean
        allow_comments:
          type: boolean
        view_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        reading_time:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Estimated reading time in minutes.
        likes_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        comments_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        published_at:
          type: string
          format: date-time
          nullable: true
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        meta_title:
          type: string
          maxLength: 200
        meta_title_en:
          type: string
          nullable: true
          title: Meta Title [en]
          maxLength: 200
        meta_title_de:
          type: string
          nullable: true
          title: Meta Title [de]
          maxLength: 200
        meta_title_fr:
          type: string
          nullable: true
          title: Meta Title [fr]
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        meta_description_en:
          type: string
          nullable: true
          title: Meta Description [en]
          maxLength: 300
        meta_description_de:
          type: string
          nullable: true
          title: Meta Description [de]
          maxLength: 300
        meta_description_fr:
          type: string
          nullable: true
          title: Meta Description [fr]
          maxLength: 300
        meta_keywords:
          type: string
          maxLength: 200
        meta_keywords_en:
          type: string
          nullable: true
          title: Meta Keywords [en]
          maxLength: 200
        meta_keywords_de:
          type: string
          nullable: true
          title: Meta Keywords [de]
          maxLength: 200
        meta_keywords_fr:
          type: string
          nullable: true
          title: Meta Keywords [fr]
          maxLength: 200
        og_image:
          type: string
          format: uri
          nullable: true
        author:
          type: integer
          nullable: true
        categories:
          type: array
          items:
            type: integer
        tags:
          type: array
          items:
            type: integer
    PatchedPostList:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        title:
          type: string
          nullable: true
          maxLength: 200
        slug:
          type: string
          nullable: true
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        excerpt:
          type: string
        author:
          allOf:
          - $ref: '#/components/schemas/Author'
          readOnly: true
        categories:
          type: array
          items:
            $ref: '#/components/schemas/Category'
          readOnly: true
        tags:
          type: array
          items:
            $ref: '#/components/schemas/Tag'
          readOnly: true
        featured_image:
          type: string
          format: uri
          nullable: true
        is_featured:
          type: boolean
        is_sticky:
          type: boolean
        published_at:
          type: string
          format: date-time
          nullable: true
        reading_time:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Estimated reading time in minutes.
        view_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        likes_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        comments_count:
          type: integer
          readOnly: true
        absolute_url:
          type: string
          readOnly: true
    PatchedProductAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        category_str:
          type: string
          readOnly: true
        name:
          type: string
          title: Product Name
          maxLength: 200
        name_en:
          type: string
          nullable: true
          title: Product Name [en]
          maxLength: 200
        name_de:
          type: string
          nullable: true
          title: Product Name [de]
          maxLength: 200
        name_fr:
          type: string
          nullable: true
          title: Product Name [fr]
          maxLength: 200
        slug:
          type: string
          maxLength: 200
          pattern: ^[-a-zA-Z0-9_]+$
        description:
          type: string
          title: Product Description
        description_en:
          type: string
          nullable: true
          title: Product Description [en]
        description_de:
          type: string
          nullable: true
          title: Product Description [de]
        description_fr:
          type: string
          nullable: true
          title: Product Description [fr]
        content:
          type: string
          title: Product Markdown Content
        content_en:
          type: string
          nullable: true
          title: Product Markdown Content [en]
        content_de:
          type: string
          nullable: true
          title: Product Markdown Content [de]
        content_fr:
          type: string
          nullable: true
          title: Product Markdown Content [fr]
        price:
          type: string
          format: decimal
          pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
        stock:
          type: integer
          maximum: 2147483647
          minimum: 0
        available:
          type: boolean
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        category:
          type: integer
          nullable: true
    PatchedProductCategoryAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 200
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 200
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 200
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 200
        slug:
          type: string
          maxLength: 200
          pattern: ^[-a-zA-Z0-9_]+$
    PatchedRequestLogAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        user_str:
          type: string
          readOnly: true
        ip_address:
          type: string
          readOnly: true
        method:
          type: string
          readOnly: true
        method_en:
          type: string
          nullable: true
          title: Method [en]
          maxLength: 10
        method_de:
          type: string
          nullable: true
          title: Method [de]
          maxLength: 10
        method_fr:
          type: string
          nullable: true
          title: Method [fr]
          maxLength: 10
        path:
          type: string
          readOnly: true
        path_en:
          type: string
          nullable: true
          title: Path [en]
          maxLength: 2048
        path_de:
          type: string
          nullable: true
          title: Path [de]
          maxLength: 2048
        path_fr:
          type: string
          nullable: true
          title: Path [fr]
          maxLength: 2048
        status_code:
          type: integer
          readOnly: true
        response_time_ms:
          type: integer
          readOnly: true
          description: Response time in milliseconds
        timestamp:
          type: string
          format: date-time
          readOnly: true
        user:
          type: integer
          readOnly: true
          nullable: true
    PatchedSiteIdentityAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_en:
          type: string
          nullable: true
          title: Name [en]
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_de:
          type: string
          nullable: true
          title: Name [de]
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          description: The name of the site, used in the title tag.
          maxLength: 255
        slogan:
          type: string
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_en:
          type: string
          nullable: true
          title: Slogan [en]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_de:
          type: string
          nullable: true
          title: Slogan [de]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_fr:
          type: string
          nullable: true
          title: Slogan [fr]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        description:
          type: string
          description: A short description of the site for SEO purposes.
        description_en:
          type: string
          nullable: true
          title: Description [en]
          description: A short description of the site for SEO purposes.
        description_de:
          type: string
          nullable: true
          title: Description [de]
          description: A short description of the site for SEO purposes.
        description_fr:
          type: string
          nullable: true
          title: Description [fr]
          description: A short description of the site for SEO purposes.
        logo:
          type: string
          format: uri
          nullable: true
          description: The main logo of the site (e.g., for light backgrounds).
        logo_dark:
          type: string
          format: uri
          nullable: true
          description: An alternative logo for dark backgrounds.
        favicon:
          type: string
          format: uri
          nullable: true
          description: The site's favicon.
        keywords:
          type: string
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_en:
          type: string
          nullable: true
          title: Keywords [en]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_de:
          type: string
          nullable: true
          title: Keywords [de]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_fr:
          type: string
          nullable: true
          title: Keywords [fr]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        author:
          type: string
          description: The name of the site's author or organization.
          maxLength: 100
        author_en:
          type: string
          nullable: true
          title: Author [en]
          description: The name of the site's author or organization.
          maxLength: 100
        author_de:
          type: string
          nullable: true
          title: Author [de]
          description: The name of the site's author or organization.
          maxLength: 100
        author_fr:
          type: string
          nullable: true
          title: Author [fr]
          description: The name of the site's author or organization.
          maxLength: 100
        contact_email:
          type: string
          format: email
          description: Public contact email address.
          maxLength: 254
        contact_email_en:
          type: string
          format: email
          nullable: true
          title: Contact email [en]
          description: Public contact email address.
          maxLength: 254
        contact_email_de:
          type: string
          format: email
          nullable: true
          title: Contact email [de]
          description: Public contact email address.
          maxLength: 254
        contact_email_fr:
          type: string
          format: email
          nullable: true
          title: Contact email [fr]
          description: Public contact email address.
          maxLength: 254
        phone_number:
          type: string
          description: Public contact phone number.
          maxLength: 20
        phone_number_en:
          type: string
          nullable: true
          title: Phone number [en]
          description: Public contact phone number.
          maxLength: 20
        phone_number_de:
          type: string
          nullable: true
          title: Phone number [de]
          description: Public contact phone number.
          maxLength: 20
        phone_number_fr:
          type: string
          nullable: true
          title: Phone number [fr]
          description: Public contact phone number.
          maxLength: 20
        twitter_url:
          type: string
          format: uri
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_en:
          type: string
          format: uri
          nullable: true
          title: Twitter url [en]
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_de:
          type: string
          format: uri
          nullable: true
          title: Twitter url [de]
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_fr:
          type: string
          format: uri
          nullable: true
          title: Twitter url [fr]
          description: URL to Twitter profile.
          maxLength: 200
        facebook_url:
          type: string
          format: uri
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_en:
          type: string
          format: uri
          nullable: true
          title: Facebook url [en]
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_de:
          type: string
          format: uri
          nullable: true
          title: Facebook url [de]
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_fr:
          type: string
          format: uri
          nullable: true
          title: Facebook url [fr]
          description: URL to Facebook page.
          maxLength: 200
        linkedin_url:
          type: string
          format: uri
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_en:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [en]
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_de:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [de]
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_fr:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [fr]
          description: URL to LinkedIn profile.
          maxLength: 200
        github_url:
          type: string
          format: uri
          description: URL to GitHub profile.
          maxLength: 200
        github_url_en:
          type: string
          format: uri
          nullable: true
          title: Github url [en]
          description: URL to GitHub profile.
          maxLength: 200
        github_url_de:
          type: string
          format: uri
          nullable: true
          title: Github url [de]
          description: URL to GitHub profile.
          maxLength: 200
        github_url_fr:
          type: string
          format: uri
          nullable: true
          title: Github url [fr]
          description: URL to GitHub profile.
          maxLength: 200
        instagram_url:
          type: string
          format: uri
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_en:
          type: string
          format: uri
          nullable: true
          title: Instagram url [en]
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_de:
          type: string
          format: uri
          nullable: true
          title: Instagram url [de]
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_fr:
          type: string
          format: uri
          nullable: true
          title: Instagram url [fr]
          description: URL to Instagram profile.
          maxLength: 200
    PatchedTOTPDeviceAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        digits_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        name:
          type: string
          description: The human-readable name of this device.
          maxLength: 64
        confirmed:
          type: boolean
          description: Is this device ready for use?
        throttling_failure_timestamp:
          type: string
          format: date-time
          nullable: true
          description: A timestamp of the last failed verification attempt. Null if
            last attempt succeeded.
        throttling_failure_count:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Number of successive failed attempts.
        created_at:
          type: string
          format: date-time
          readOnly: true
          nullable: true
          description: The date and time when this device was initially created in
            the system.
        last_used_at:
          type: string
          format: date-time
          readOnly: true
          nullable: true
          description: The most recent date and time this device was used.
        key:
          type: string
          description: A hex-encoded secret key of up to 40 bytes.
          maxLength: 80
        step:
          type: integer
          maximum: 32767
          minimum: 0
          description: The time step in seconds.
        t0:
          type: integer
          maximum: 9223372036854775807
          minimum: -9223372036854775808
          format: int64
          description: The Unix time at which to begin counting steps.
        digits:
          allOf:
          - $ref: '#/components/schemas/DigitsEnum'
          description: |-
            The number of digits to expect in a token.

            * `6` - 6
            * `8` - 8
          minimum: 0
          maximum: 32767
        tolerance:
          type: integer
          maximum: 32767
          minimum: 0
          description: The number of time steps in the past or future to allow.
        drift:
          type: integer
          maximum: 32767
          minimum: -32768
          description: The number of time steps the prover is known to deviate from
            our clock.
        last_t:
          type: integer
          maximum: 9223372036854775807
          minimum: -9223372036854775808
          format: int64
          description: The t value of the latest verified token. The next token must
            be at a higher time step.
        user:
          type: integer
          description: The user that this device belongs to.
    PatchedTagAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 50
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 50
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 50
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 50
        slug:
          type: string
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        color:
          type: string
          description: Hex color code for frontend styling
          maxLength: 7
        color_en:
          type: string
          nullable: true
          title: Color [en]
          description: Hex color code for frontend styling
          maxLength: 7
        color_de:
          type: string
          nullable: true
          title: Color [de]
          description: Hex color code for frontend styling
          maxLength: 7
        color_fr:
          type: string
          nullable: true
          title: Color [fr]
          description: Hex color code for frontend styling
          maxLength: 7
        post_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        created_at:
          type: string
          format: date-time
          readOnly: true
    PatchedUserAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        password:
          type: string
          writeOnly: true
          maxLength: 128
        last_login:
          type: string
          format: date-time
          nullable: true
        is_superuser:
          type: boolean
          title: Superuser status
          description: Designates that this user has all permissions without explicitly
            assigning them.
        username:
          type: string
          description: Required. 150 characters or fewer. Letters, digits and @/./+/-/_
            only.
          pattern: ^[\w.@+-]+$
          maxLength: 150
        first_name:
          type: string
          maxLength: 150
        last_name:
          type: string
          maxLength: 150
        email:
          type: string
          format: email
          title: Email address
          maxLength: 254
        is_staff:
          type: boolean
          title: Staff status
          description: Designates whether the user can log into this admin site.
        is_active:
          type: boolean
          title: Active
          description: Designates whether this user should be treated as active. Unselect
            this instead of deleting accounts.
        date_joined:
          type: string
          format: date-time
        groups:
          type: array
          items:
            type: integer
          description: The groups this user belongs to. A user will get all permissions
            granted to each of their groups.
        user_permissions:
          type: array
          items:
            type: integer
          description: Specific permissions for this user.
    PatchedUserProfile:
      type: object
      properties:
        username:
          type: string
          description: Required. 150 characters or fewer. Letters, digits and @/./+/-/_
            only.
          pattern: ^[\w.@+-]+$
          maxLength: 150
        email:
          type: string
          format: email
          readOnly: true
          title: Email address
        first_name:
          type: string
          maxLength: 150
        last_name:
          type: string
          maxLength: 150
        is_2fa_enabled:
          type: string
          readOnly: true
    PostAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        status_display:
          type: string
          readOnly: true
        author_str:
          type: string
          readOnly: true
        title:
          type: string
          nullable: true
          maxLength: 200
        title_en:
          type: string
          nullable: true
          title: Title [en]
          maxLength: 200
        title_de:
          type: string
          nullable: true
          title: Title [de]
          maxLength: 200
        title_fr:
          type: string
          nullable: true
          title: Title [fr]
          maxLength: 200
        slug:
          type: string
          nullable: true
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        content:
          type: string
          nullable: true
        content_en:
          type: string
          nullable: true
          title: Content [en]
        content_de:
          type: string
          nullable: true
          title: Content [de]
        content_fr:
          type: string
          nullable: true
          title: Content [fr]
        excerpt:
          type: string
        excerpt_en:
          type: string
          nullable: true
          title: Excerpt [en]
        excerpt_de:
          type: string
          nullable: true
          title: Excerpt [de]
        excerpt_fr:
          type: string
          nullable: true
          title: Excerpt [fr]
        featured_image:
          type: string
          format: uri
          nullable: true
        status:
          $ref: '#/components/schemas/PostAdminStatusEnum'
        is_featured:
          type: boolean
        is_sticky:
          type: boolean
        allow_comments:
          type: boolean
        view_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        reading_time:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Estimated reading time in minutes.
        likes_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        comments_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        published_at:
          type: string
          format: date-time
          nullable: true
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        meta_title:
          type: string
          maxLength: 200
        meta_title_en:
          type: string
          nullable: true
          title: Meta Title [en]
          maxLength: 200
        meta_title_de:
          type: string
          nullable: true
          title: Meta Title [de]
          maxLength: 200
        meta_title_fr:
          type: string
          nullable: true
          title: Meta Title [fr]
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        meta_description_en:
          type: string
          nullable: true
          title: Meta Description [en]
          maxLength: 300
        meta_description_de:
          type: string
          nullable: true
          title: Meta Description [de]
          maxLength: 300
        meta_description_fr:
          type: string
          nullable: true
          title: Meta Description [fr]
          maxLength: 300
        meta_keywords:
          type: string
          maxLength: 200
        meta_keywords_en:
          type: string
          nullable: true
          title: Meta Keywords [en]
          maxLength: 200
        meta_keywords_de:
          type: string
          nullable: true
          title: Meta Keywords [de]
          maxLength: 200
        meta_keywords_fr:
          type: string
          nullable: true
          title: Meta Keywords [fr]
          maxLength: 200
        og_image:
          type: string
          format: uri
          nullable: true
        author:
          type: integer
          nullable: true
        categories:
          type: array
          items:
            type: integer
        tags:
          type: array
          items:
            type: integer
      required:
      - author_str
      - created_at
      - id
      - status_display
      - updated_at
    PostAdminStatusEnum:
      enum:
      - draft
      - published
      - scheduled
      - archived
      type: string
      description: |-
        * `draft` - Draft
        * `published` - Published
        * `scheduled` - Scheduled
        * `archived` - Archived
    PostDetail:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        title:
          type: string
          nullable: true
          maxLength: 200
        slug:
          type: string
          nullable: true
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        excerpt:
          type: string
        author:
          allOf:
          - $ref: '#/components/schemas/Author'
          readOnly: true
        categories:
          type: array
          items:
            $ref: '#/components/schemas/Category'
          readOnly: true
        tags:
          type: array
          items:
            $ref: '#/components/schemas/Tag'
          readOnly: true
        featured_image:
          type: string
          format: uri
          nullable: true
        is_featured:
          type: boolean
        is_sticky:
          type: boolean
        published_at:
          type: string
          format: date-time
          nullable: true
        reading_time:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Estimated reading time in minutes.
        view_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        likes_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        comments_count:
          type: integer
          readOnly: true
        absolute_url:
          type: string
          readOnly: true
        content:
          type: string
          nullable: true
        meta_title:
          type: string
          maxLength: 200
        meta_description:
          type: string
          maxLength: 300
        meta_keywords:
          type: string
          maxLength: 200
        og_image:
          type: string
          format: uri
          nullable: true
        previous_post:
          type: string
          readOnly: true
        next_post:
          type: string
          readOnly: true
        related_posts:
          type: string
          readOnly: true
      required:
      - absolute_url
      - author
      - categories
      - comments_count
      - id
      - next_post
      - previous_post
      - related_posts
      - tags
    PostList:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        title:
          type: string
          nullable: true
          maxLength: 200
        slug:
          type: string
          nullable: true
          maxLength: 255
          pattern: ^[-a-zA-Z0-9_]+$
        excerpt:
          type: string
        author:
          allOf:
          - $ref: '#/components/schemas/Author'
          readOnly: true
        categories:
          type: array
          items:
            $ref: '#/components/schemas/Category'
          readOnly: true
        tags:
          type: array
          items:
            $ref: '#/components/schemas/Tag'
          readOnly: true
        featured_image:
          type: string
          format: uri
          nullable: true
        is_featured:
          type: boolean
        is_sticky:
          type: boolean
        published_at:
          type: string
          format: date-time
          nullable: true
        reading_time:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Estimated reading time in minutes.
        view_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        likes_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        comments_count:
          type: integer
          readOnly: true
        absolute_url:
          type: string
          readOnly: true
      required:
      - absolute_url
      - author
      - categories
      - comments_count
      - id
      - tags
    ProductAdmin:
      type: object
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
        category_str:
          type: string
          readOnly: true
        name:
          type: string
          title: Product Name
          maxLength: 200
        name_en:
          type: string
          nullable: true
          title: Product Name [en]
          maxLength: 200
        name_de:
          type: string
          nullable: true
          title: Product Name [de]
          maxLength: 200
        name_fr:
          type: string
          nullable: true
          title: Product Name [fr]
          maxLength: 200
        slug:
          type: string
          maxLength: 200
          pattern: ^[-a-zA-Z0-9_]+$
        description:
          type: string
          title: Product Description
        description_en:
          type: string
          nullable: true
          title: Product Description [en]
        description_de:
          type: string
          nullable: true
          title: Product Description [de]
        description_fr:
          type: string
          nullable: true
          title: Product Description [fr]
        content:
          type: string
          title: Product Markdown Content
        content_en:
          type: string
          nullable: true
          title: Product Markdown Content [en]
        content_de:
          type: string
          nullable: true
          title: Product Markdown Content [de]
        content_fr:
          type: string
          nullable: true
          title: Product Markdown Content [fr]
        price:
          type: string
          format: decimal
          pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
        stock:
          type: integer
          maximum: 2147483647
          minimum: 0
        available:
          type: boolean
        created_at:
          type: string
          format: date-time
          readOnly: true
        updated_at:
          type: string
          format: date-time
          readOnly: true
        category:
          type: integer
          nullable: true
      required:
      - category_str
      - created_at
      - id
      - name
      - price
      - slug
      - updated_at
    ProductCategoryAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 200
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 200
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 200
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 200
        slug:
          type: string
          maxLength: 200
          pattern: ^[-a-zA-Z0-9_]+$
      required:
      - id
      - name
      - slug
    RequestLogAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        user_str:
          type: string
          readOnly: true
        ip_address:
          type: string
          readOnly: true
        method:
          type: string
          readOnly: true
        method_en:
          type: string
          nullable: true
          title: Method [en]
          maxLength: 10
        method_de:
          type: string
          nullable: true
          title: Method [de]
          maxLength: 10
        method_fr:
          type: string
          nullable: true
          title: Method [fr]
          maxLength: 10
        path:
          type: string
          readOnly: true
        path_en:
          type: string
          nullable: true
          title: Path [en]
          maxLength: 2048
        path_de:
          type: string
          nullable: true
          title: Path [de]
          maxLength: 2048
        path_fr:
          type: string
          nullable: true
          title: Path [fr]
          maxLength: 2048
        status_code:
          type: integer
          readOnly: true
        response_time_ms:
          type: integer
          readOnly: true
          description: Response time in milliseconds
        timestamp:
          type: string
          format: date-time
          readOnly: true
        user:
          type: integer
          readOnly: true
          nullable: true
      required:
      - id
      - ip_address
      - method
      - path
      - response_time_ms
      - status_code
      - timestamp
      - user
      - user_str
    SiteIdentityAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_en:
          type: string
          nullable: true
          title: Name [en]
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_de:
          type: string
          nullable: true
          title: Name [de]
          description: The name of the site, used in the title tag.
          maxLength: 255
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          description: The name of the site, used in the title tag.
          maxLength: 255
        slogan:
          type: string
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_en:
          type: string
          nullable: true
          title: Slogan [en]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_de:
          type: string
          nullable: true
          title: Slogan [de]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        slogan_fr:
          type: string
          nullable: true
          title: Slogan [fr]
          description: A catchy slogan or tagline for the site.
          maxLength: 255
        description:
          type: string
          description: A short description of the site for SEO purposes.
        description_en:
          type: string
          nullable: true
          title: Description [en]
          description: A short description of the site for SEO purposes.
        description_de:
          type: string
          nullable: true
          title: Description [de]
          description: A short description of the site for SEO purposes.
        description_fr:
          type: string
          nullable: true
          title: Description [fr]
          description: A short description of the site for SEO purposes.
        logo:
          type: string
          format: uri
          nullable: true
          description: The main logo of the site (e.g., for light backgrounds).
        logo_dark:
          type: string
          format: uri
          nullable: true
          description: An alternative logo for dark backgrounds.
        favicon:
          type: string
          format: uri
          nullable: true
          description: The site's favicon.
        keywords:
          type: string
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_en:
          type: string
          nullable: true
          title: Keywords [en]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_de:
          type: string
          nullable: true
          title: Keywords [de]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        keywords_fr:
          type: string
          nullable: true
          title: Keywords [fr]
          description: Comma-separated keywords for SEO.
          maxLength: 255
        author:
          type: string
          description: The name of the site's author or organization.
          maxLength: 100
        author_en:
          type: string
          nullable: true
          title: Author [en]
          description: The name of the site's author or organization.
          maxLength: 100
        author_de:
          type: string
          nullable: true
          title: Author [de]
          description: The name of the site's author or organization.
          maxLength: 100
        author_fr:
          type: string
          nullable: true
          title: Author [fr]
          description: The name of the site's author or organization.
          maxLength: 100
        contact_email:
          type: string
          format: email
          description: Public contact email address.
          maxLength: 254
        contact_email_en:
          type: string
          format: email
          nullable: true
          title: Contact email [en]
          description: Public contact email address.
          maxLength: 254
        contact_email_de:
          type: string
          format: email
          nullable: true
          title: Contact email [de]
          description: Public contact email address.
          maxLength: 254
        contact_email_fr:
          type: string
          format: email
          nullable: true
          title: Contact email [fr]
          description: Public contact email address.
          maxLength: 254
        phone_number:
          type: string
          description: Public contact phone number.
          maxLength: 20
        phone_number_en:
          type: string
          nullable: true
          title: Phone number [en]
          description: Public contact phone number.
          maxLength: 20
        phone_number_de:
          type: string
          nullable: true
          title: Phone number [de]
          description: Public contact phone number.
          maxLength: 20
        phone_number_fr:
          type: string
          nullable: true
          title: Phone number [fr]
          description: Public contact phone number.
          maxLength: 20
        twitter_url:
          type: string
          format: uri
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_en:
          type: string
          format: uri
          nullable: true
          title: Twitter url [en]
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_de:
          type: string
          format: uri
          nullable: true
          title: Twitter url [de]
          description: URL to Twitter profile.
          maxLength: 200
        twitter_url_fr:
          type: string
          format: uri
          nullable: true
          title: Twitter url [fr]
          description: URL to Twitter profile.
          maxLength: 200
        facebook_url:
          type: string
          format: uri
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_en:
          type: string
          format: uri
          nullable: true
          title: Facebook url [en]
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_de:
          type: string
          format: uri
          nullable: true
          title: Facebook url [de]
          description: URL to Facebook page.
          maxLength: 200
        facebook_url_fr:
          type: string
          format: uri
          nullable: true
          title: Facebook url [fr]
          description: URL to Facebook page.
          maxLength: 200
        linkedin_url:
          type: string
          format: uri
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_en:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [en]
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_de:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [de]
          description: URL to LinkedIn profile.
          maxLength: 200
        linkedin_url_fr:
          type: string
          format: uri
          nullable: true
          title: Linkedin url [fr]
          description: URL to LinkedIn profile.
          maxLength: 200
        github_url:
          type: string
          format: uri
          description: URL to GitHub profile.
          maxLength: 200
        github_url_en:
          type: string
          format: uri
          nullable: true
          title: Github url [en]
          description: URL to GitHub profile.
          maxLength: 200
        github_url_de:
          type: string
          format: uri
          nullable: true
          title: Github url [de]
          description: URL to GitHub profile.
          maxLength: 200
        github_url_fr:
          type: string
          format: uri
          nullable: true
          title: Github url [fr]
          description: URL to GitHub profile.
          maxLength: 200
        instagram_url:
          type: string
          format: uri
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_en:
          type: string
          format: uri
          nullable: true
          title: Instagram url [en]
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_de:
          type: string
          format: uri
          nullable: true
          title: Instagram url [de]
          description: URL to Instagram profile.
          maxLength: 200
        instagram_url_fr:
          type: string
          format: uri
          nullable: true
          title: Instagram url [fr]
          description: URL to Instagram profile.
          maxLength: 200
      required:
      - id
    Status40cEnum:
      enum:
      - pending
      - processing
      - shipped
      - delivered
      - cancelled
      - confirmed
      type: string
      description: |-
        * `pending` - Pending
        * `processing` - Processing
        * `shipped` - Shipped
        * `delivered` - Delivered
        * `cancelled` - Cancelled
        * `confirmed` - Confirmed
    StatusDeEnum:
      enum:
      - pending
      - processing
      - shipped
      - delivered
      - cancelled
      - confirmed
      type: string
      description: |-
        * `pending` - Pending
        * `processing` - Processing
        * `shipped` - Shipped
        * `delivered` - Delivered
        * `cancelled` - Cancelled
        * `confirmed` - Confirmed
    StatusEnEnum:
      enum:
      - pending
      - processing
      - shipped
      - delivered
      - cancelled
      - confirmed
      type: string
      description: |-
        * `pending` - Pending
        * `processing` - Processing
        * `shipped` - Shipped
        * `delivered` - Delivered
        * `cancelled` - Cancelled
        * `confirmed` - Confirmed
    StatusFrEnum:
      enum:
      - pending
      - processing
      - shipped
      - delivered
      - cancelled
      - confirmed
      type: string
      description: |-
        * `pending` - Pending
        * `processing` - Processing
        * `shipped` - Shipped
        * `delivered` - Delivered
        * `cancelled` - Cancelled
        * `confirmed` - Confirmed
    TOTPDeviceAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        digits_display:
          type: string
          readOnly: true
        user_str:
          type: string
          readOnly: true
        name:
          type: string
          description: The human-readable name of this device.
          maxLength: 64
        confirmed:
          type: boolean
          description: Is this device ready for use?
        throttling_failure_timestamp:
          type: string
          format: date-time
          nullable: true
          description: A timestamp of the last failed verification attempt. Null if
            last attempt succeeded.
        throttling_failure_count:
          type: integer
          maximum: 2147483647
          minimum: 0
          description: Number of successive failed attempts.
        created_at:
          type: string
          format: date-time
          readOnly: true
          nullable: true
          description: The date and time when this device was initially created in
            the system.
        last_used_at:
          type: string
          format: date-time
          readOnly: true
          nullable: true
          description: The most recent date and time this device was used.
        key:
          type: string
          description: A hex-encoded secret key of up to 40 bytes.
          maxLength: 80
        step:
          type: integer
          maximum: 32767
          minimum: 0
          description: The time step in seconds.
        t0:
          type: integer
          maximum: 9223372036854775807
          minimum: -9223372036854775808
          format: int64
          description: The Unix time at which to begin counting steps.
        digits:
          allOf:
          - $ref: '#/components/schemas/DigitsEnum'
          description: |-
            The number of digits to expect in a token.

            * `6` - 6
            * `8` - 8
          minimum: 0
          maximum: 32767
        tolerance:
          type: integer
          maximum: 32767
          minimum: 0
          description: The number of time steps in the past or future to allow.
        drift:
          type: integer
          maximum: 32767
          minimum: -32768
          description: The number of time steps the prover is known to deviate from
            our clock.
        last_t:
          type: integer
          maximum: 9223372036854775807
          minimum: -9223372036854775808
          format: int64
          description: The t value of the latest verified token. The next token must
            be at a higher time step.
        user:
          type: integer
          description: The user that this device belongs to.
      required:
      - created_at
      - digits_display
      - id
      - last_used_at
      - name
      - user
      - user_str
    Tag:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 50
        slug:
          type: string
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        color:
          type: string
          description: Hex color code for frontend styling
          maxLength: 7
        post_count:
          type: integer
          readOnly: true
      required:
      - id
      - name
      - post_count
    TagAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        name:
          type: string
          maxLength: 50
        name_en:
          type: string
          nullable: true
          title: Name [en]
          maxLength: 50
        name_de:
          type: string
          nullable: true
          title: Name [de]
          maxLength: 50
        name_fr:
          type: string
          nullable: true
          title: Name [fr]
          maxLength: 50
        slug:
          type: string
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_en:
          type: string
          nullable: true
          title: Slug [en]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_de:
          type: string
          nullable: true
          title: Slug [de]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        slug_fr:
          type: string
          nullable: true
          title: Slug [fr]
          maxLength: 60
          pattern: ^[-a-zA-Z0-9_]+$
        color:
          type: string
          description: Hex color code for frontend styling
          maxLength: 7
        color_en:
          type: string
          nullable: true
          title: Color [en]
          description: Hex color code for frontend styling
          maxLength: 7
        color_de:
          type: string
          nullable: true
          title: Color [de]
          description: Hex color code for frontend styling
          maxLength: 7
        color_fr:
          type: string
          nullable: true
          title: Color [fr]
          description: Hex color code for frontend styling
          maxLength: 7
        post_count:
          type: integer
          maximum: 2147483647
          minimum: 0
        created_at:
          type: string
          format: date-time
          readOnly: true
      required:
      - created_at
      - id
      - name
    ThemeDeEnum:
      enum:
      - light
      - dark
      - system
      type: string
      description: |-
        * `light` - Light
        * `dark` - Dark
        * `system` - System Default
    ThemeEnEnum:
      enum:
      - light
      - dark
      - system
      type: string
      description: |-
        * `light` - Light
        * `dark` - Dark
        * `system` - System Default
    ThemeEnum:
      enum:
      - light
      - dark
      - system
      type: string
      description: |-
        * `light` - Light
        * `dark` - Dark
        * `system` - System Default
    ThemeFrEnum:
      enum:
      - light
      - dark
      - system
      type: string
      description: |-
        * `light` - Light
        * `dark` - Dark
        * `system` - System Default
    TokenRefresh:
      type: object
      properties:
        access:
          type: string
          readOnly: true
        refresh:
          type: string
          writeOnly: true
      required:
      - access
      - refresh
    TwoFactorTokenObtainPair:
      type: object
      properties:
        username:
          type: string
          writeOnly: true
        password:
          type: string
          writeOnly: true
      required:
      - password
      - username
    TwoFactorTokenVerify:
      type: object
      description: Serializer for verifying the OTP and user credentials.
      properties:
        username:
          type: string
        password:
          type: string
        otp:
          type: string
          title: One-Time Password
      required:
      - otp
      - password
      - username
    TwoFactorVerify:
      type: object
      description: Serializer for verifying the OTP to confirm 2FA setup.
      properties:
        otp:
          type: string
          maxLength: 6
          minLength: 6
      required:
      - otp
    UserAdmin:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        password:
          type: string
          writeOnly: true
          maxLength: 128
        last_login:
          type: string
          format: date-time
          nullable: true
        is_superuser:
          type: boolean
          title: Superuser status
          description: Designates that this user has all permissions without explicitly
            assigning them.
        username:
          type: string
          description: Required. 150 characters or fewer. Letters, digits and @/./+/-/_
            only.
          pattern: ^[\w.@+-]+$
          maxLength: 150
        first_name:
          type: string
          maxLength: 150
        last_name:
          type: string
          maxLength: 150
        email:
          type: string
          format: email
          title: Email address
          maxLength: 254
        is_staff:
          type: boolean
          title: Staff status
          description: Designates whether the user can log into this admin site.
        is_active:
          type: boolean
          title: Active
          description: Designates whether this user should be treated as active. Unselect
            this instead of deleting accounts.
        date_joined:
          type: string
          format: date-time
        groups:
          type: array
          items:
            type: integer
          description: The groups this user belongs to. A user will get all permissions
            granted to each of their groups.
        user_permissions:
          type: array
          items:
            type: integer
          description: Specific permissions for this user.
      required:
      - id
      - password
      - username
    UserProfile:
      type: object
      properties:
        username:
          type: string
          description: Required. 150 characters or fewer. Letters, digits and @/./+/-/_
            only.
          pattern: ^[\w.@+-]+$
          maxLength: 150
        email:
          type: string
          format: email
          readOnly: true
          title: Email address
        first_name:
          type: string
          maxLength: 150
        last_name:
          type: string
          maxLength: 150
        is_2fa_enabled:
          type: string
          readOnly: true
      required:
      - email
      - is_2fa_enabled
      - username
  securitySchemes:
    jwtAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
