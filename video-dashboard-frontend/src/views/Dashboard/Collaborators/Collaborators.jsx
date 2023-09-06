import { useEffect, useState } from 'react'
import {
  Box,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import Table from '../../../components/Table/Table'
import { collaboratorEditFormData, collaboratorAddFormData } from './formData'
import DialogForm from '../../../components/DialogForm/DialogForm'
import { useSelector, useDispatch } from 'react-redux'
import { collaboratorActions } from '../../../redux-store'
import Alert from '../../../components/Alert/Alert'
import ClipLoader from 'react-spinners/ClipLoader'

const Collaborators = () => {
  const theme = useTheme()
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [collaboratorToEdit, setCollaboratorToEdit] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const { collaborators, loading, error } = useSelector((state) => state.collaborators)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const toggleDialog = (openDialog, collaborator) => {
    setCollaboratorToEdit(collaborator)
    setOpenEditDialog(openDialog)
  }
  const openDialog = () => {
    setOpenAddDialog(true)
  }
  useEffect(() => {
    dispatch(collaboratorActions.fetchCollaborators())
  }, [dispatch])
  
  const editCollaborator = (formState) => {
    let val = {
      name: formState.name.value,
      role: formState.role.value,
      profilePicture:formState.profilePicture.value,
      id: collaboratorToEdit._id,
    }
    dispatch(collaboratorActions.editCollaborator(val))
  }

  const addCollaborator = (formState) => {
    let val = {
      name: formState.name.value,
      role: formState.role.value,
      profilePicture:formState.profilePicture.value,
      createdBy:user._id
    }
    dispatch(collaboratorActions.addCollaborator(val))
  }
  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4'>Collaborators</Typography>
        <IconButton title='Add New Collaborator' onClick={() => openDialog()}>
          <Add />
        </IconButton>
      </Box>
      {loading ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 70,
          }}
        >
          <ClipLoader color={'#000000'} loading={loading} size={40} />
        </div>
      ) : error ? (
        <Alert variant='error'>{error}</Alert>
      ) : (
        <div>
          <br />
          <Table
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Role', field: 'role' },
              { title: 'Actions', field: 'actions', filtering: false },
            ]}
            options={{
              toolbar: false,
              headerStyle: {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.white,
                fontWeight: 500,
                fontSize: 14,
              },
              rowStyle: {
                alignItems: 'center',
              },
              search: false,
              filtering: true,
              title: false,
              grouping: true,
            }}
            data={collaborators?.map((collaborator) => ({
              name: collaborator.name,
              role: collaborator.role,
              actions: (
                <ButtonGroup>
                  <IconButton
                    title='Edit Collaborator'
                    onClick={() => toggleDialog(true, collaborator)}
                  >
                    <Edit />
                  </IconButton>

                </ButtonGroup>
              ),
            }))}
          ></Table>
          <DialogForm
            open={openEditDialog}
            onClose={() => {
              toggleDialog(false, null)
            }}
            formData={collaboratorToEdit}
            formConfig={collaboratorEditFormData}
            onSubmit={(formState) => editCollaborator(formState)}
            title={'Edit Collaborator'}
          />
          <DialogForm
            open={openAddDialog}
            onClose={() => {
              setOpenAddDialog(false)
            }}
            formData={collaboratorToEdit}
            formConfig={collaboratorAddFormData}
            onSubmit={(formState) => addCollaborator(formState)}
            title={'Add Collaborator'}
          />
        </div>
      )}
    </>
  )
}

Collaborators.defaultProps = {
  collaborators: [
    {
      id: '123543',
      name: 'Atif Aslam',

    },
    {
      id: '123544',
      name: 'Michele Jackson',
    
    },
    {
      id: '123545',
      name: 'Jonny Knoxx',
    
    },
    {
      id: '123546',
      name: 'Daffy Duck',
   
    },
  ],
}

export default Collaborators
