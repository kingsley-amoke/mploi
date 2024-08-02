import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput,} from 'react-native-paper';
import React, { useState } from 'react'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '@/src/utils/firebaseConfig';
import { useRouter } from 'expo-router';
import useTheme from '@/src/hooks/useTheme';
import { Colors } from '@/src/constants/Colors';

const add = () => {

    const router = useRouter();

    const { colorScheme } = useTheme();

    const iconColor = colorScheme === "dark" ? "white" : "black";
  
    const borderColor =
      colorScheme === "dark"
        ? Colors.dark.onSurfaceDisabled
        : Colors.light.onSurfaceDisabled;

    const jobExperience = [
        {
            id:1,
            name:'Junior'
        },
        {
            id:2,
            name:'Intermediate'
        },
        {
            id:3,
            name:'Senior'
        }
    ]

    const workTime = [
        {
            id: 1,
            name: 'Intern'
        },
        {
            id: 2,
            name: 'Part Time'
        },
        {
            id: 3,
            name: 'Full Time'
        },
        {
            id: 4,
            name: 'Contract'
        },
        {
            id: 5,
            name: 'Consultant'
        }
    ]

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [experience, setExperience] = useState('Experience Level')
    const [workType, setWorkType] = useState('Job Type');
    const [salary, setSalary] = useState('');
    const [requirements, setRequirements] = useState('')
    const [others, setOthers] = useState('')

    const [posting, setPosting] = useState(false);


    const handlePostJob = async() => {

        const id = Date.now().toString();

        const _doc = {
            _id: id,
            title,
            experience,
            location,
            workType,
            description,
            requirements,
            others,
            salary,
            company,
            taken: false
        }

        setPosting(true)
        const jobRef = doc(firestoreDB, 'jobs', _doc._id)

        setDoc(jobRef, _doc).then(() => {
            console.log('Job posted successfully');
            router.back();
            setPosting(false)
        })


    }


  return (
    <ScrollView style={{flex:1, marginVertical:30}}>
      <View style={{margin:10, gap:30, paddingTop:20}}>
        <TextInput label="Title" mode='outlined' onChangeText={(value) => setTitle(value)}/>
        <TextInput label="Description" mode='outlined' onChangeText={(value) => setDescription(value)}/>
        <TextInput label="Location" mode='outlined' onChangeText={(value) =>setLocation(value)}/>
        <TextInput label="Company" mode='outlined' onChangeText={(value) => setCompany(value)}/>
            <View style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: borderColor,
                }}>

        <SectionedMultiSelect items={jobExperience} IconRenderer={MaterialIcons} uniqueKey='name' single selectText={experience} colors={{ selectToggleTextColor: iconColor }} onSelectedItemsChange={(item)=>setExperience(item[0])}/>
            </View>
            <View style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: borderColor,
                }}>

       <SectionedMultiSelect items={workTime} IconRenderer={MaterialIcons}  uniqueKey='name' single selectText={workType} colors={{ selectToggleTextColor: iconColor }} onSelectedItemsChange={(item) => setWorkType(item[0])}/>
            </View>
        <TextInput label="Salary" mode='outlined'  onChangeText={(value) => setSalary(value)}/>
        <TextInput label="Requirements" mode='outlined' multiline numberOfLines={10} onChangeText={(value) => setRequirements(value)}/>
        <TextInput label="Others" mode='outlined' multiline numberOfLines={10}  onChangeText={(value) => setOthers(value)}/>

      </View>
      <Button icon='post' mode='contained' onPress={handlePostJob}>{posting ? "Posting..." : "Post"}</Button>
    </ScrollView>
  )
}

export default add

const styles = StyleSheet.create({})