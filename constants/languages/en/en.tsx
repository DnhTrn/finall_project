const en={
    notification:{
        status:'Notification',
        message:{
            login:{
                false:'Wrong email or password',
            },
            changePassword:{
                length:'Password must have at least 8 characters.',
                confirm:'Password and confirm password must be the same.',
                upper:'Password must have at least one capital letter.',
                special:'Password must have at least one special signature.',
                wrong:'Error during update.'
            },
            remove:{
                register:'Did you sure you want to remove this register?',
            },
            error:{
                register:'False to remove this register',
                'null-fields':'Enter all the data fields.',
                'update-false':'False to update this data',
                'create-false':'False to create',
            },
        },
        btn:{
            cancel:'Cancel',
            ok:'Ok',
            success:'Success',
        }
    },
    status:{
        title:'Status',
        register:{
            0:'Waiting',
            1:'Active',
            2:'Cancelled',
        }
    },
    register_detail:{
        tern:'Tern:',
        regu:'Regulation:',
        orien:'Orientation:',
        sort:'Sort Description:',
        full:'Full Description:',
        lec:'Lecture:',
        managers:'Managers:',
        name:'Register name:',
        create:'Created at:'
    },
    create:{
      club:{
          name:{
              title:'Input the club name',
              des:'Name of club will be the key for member can be search to join'
          },
          orien:{
              title:'Input the orientation of the club',
              des:'Orientation:The club\'s orientation will be used to advise members about the club',
          },
          sort:{
              title:'Input the sort description',
              des:'Short description will be show when member searching club'
          },
          full:{
              title:'Input the full description',
              des:'Full description will be show on the club screenclub',
          },
          lect:{
              opTitle:'Choose the type of input lecturer',
              opDes:'You can add a lecturer after the information is approved, or the school will assign a lecturer.',
              inputTitle:'Input the club lecture',
              inputDes:'Enter your lecturer code. You can check the lecturer code on the school\'s website.',
              options:{
                  true:'Add your lecturer',
                  false:'School assign lecturer',
              }
          },
          managers:{
              opTitle:'Add a member of the management board',
              opDes:'You can add members after they\'ve been approved',
              inputTitle:'Input the management board',
              inputDes:'Enter the management board code to add the list',
              options:{
                  true:'Add a management board',
                  false:'Add latter',
              }
          },
          file:{
              opTitle:'Change new tern and regular file',
              opDes:'If dont change the old files will be used',
              tern:'Choose file tern of club',
              ternDes:'The terms of the club are mandatory when initiating the club. The Terms govern the club as well as its members.',
              regular:'Choose file regulations of club.',
              regularDes:'Regulations are mandatory when initiating a club. The regulations aim to regulate and sanction the club.',
              options:{
                  true:'Change files',
                  false:'Keep old files',
              }
          },
          tern:{
            title:'Tern file:',
              des:'This file needs to contain the rules for activities in the club'
          },
          regular:{
              title:'Regulation file:',
              des:'This file needs to contain the rules for activities in the club'
          },
          policy:'Agree to the school\'s policies and the app\'s policies on club management and operations.',
          btn:{
              pre:'Pre step',
              next:'Next step',
              submit:'Submit',
          },

      },
        event:{
            type:{
                opTitle:'Select the event type',
                opDes:'By default, it will be an internal event within the club. These events are open to club members only.',
                inputTitle:'Choose the main event',
                inputDes:'When selecting the main event, this event will be in a waiting state for approval. Once approved, the event can be open to all students to participate.',
                options:{
                    true:'Join the main event.',
                    false:'Internal events.',
                }
            },
            event_name:{
                title:'Input the event name',
                des:'The event name will be displayed mainly and is the content used to search for events.'
            },
            event_sort:{
                title:'Enter a short description',
                des:'A short description appears outside the event and describes the main content of the event.'
            },
            event_full:{
                title:'Enter a full description',
                des:'The long description needs to describe the event\'s content in detail and be displayed within the event details section.'
            },
            event_date:{
                title:'Select the event start and end date',
                des:'The default start and end date will be the date the event was created. The end date must be greater than or equal to the start date.'
            }
        }
    },
    head:{
      home:'Home',
        clubs:'Clubs',
      events:'Events',
      calendar:'Calendar',
      notification:'Notification',
      menu:'Menu',
      profile:'Profile',
      search:'Search',
    },
    login:{
        text:'Login',
        form:{
            title:'Login your account',
            des:'You must login with school account',
            email:{
                title:'Email',
                placeholder:'Email',
            },
            password:{
                title:'Password',
                placeholder:'Password',
            },
            btn:'Login',
            option:{
                true:'Show password',
                false:'Hide password',
            }
        },

    }
}
//
export default en;